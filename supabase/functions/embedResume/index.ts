
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { pipeline } from 'https://esm.sh/@huggingface/transformers@3.5.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

let embedder: any = null;

async function initializeEmbedder() {
  if (!embedder) {
    console.log('Initializing MiniLM embedder...');
    embedder = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2', {
      device: 'cpu',
    });
    console.log('Embedder initialized');
  }
  return embedder;
}

async function generateEmbedding(text: string): Promise<number[]> {
  const embedder = await initializeEmbedder();
  const result = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(result.data);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    console.log('Starting resume embedding process...');

    // Get all chunks without embeddings
    const { data: chunks, error: fetchError } = await supabaseClient
      .from('resume_chunks')
      .select('id, content')
      .is('embedding', null);

    if (fetchError) {
      throw fetchError;
    }

    console.log(`Found ${chunks?.length || 0} chunks to embed`);

    if (!chunks || chunks.length === 0) {
      return new Response(
        JSON.stringify({ message: 'All chunks already have embeddings', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let processed = 0;
    
    for (const chunk of chunks) {
      console.log(`Processing chunk ${chunk.id}...`);
      
      const embedding = await generateEmbedding(chunk.content);
      
      const { error: updateError } = await supabaseClient
        .from('resume_chunks')
        .update({ embedding })
        .eq('id', chunk.id);

      if (updateError) {
        console.error(`Error updating chunk ${chunk.id}:`, updateError);
        continue;
      }

      processed++;
      console.log(`Embedded chunk ${chunk.id} (${processed}/${chunks.length})`);
    }

    return new Response(
      JSON.stringify({ 
        message: 'Resume embedding completed',
        processed,
        total: chunks.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in embedResume function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to embed resume chunks',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
