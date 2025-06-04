
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { pipeline } from 'https://esm.sh/@huggingface/transformers@3.5.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  query: string;
  history?: ChatTurn[];
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

async function checkKnowledgeBase(supabase: any): Promise<boolean> {
  const { data, error } = await supabase
    .from('resume_chunks')
    .select('id')
    .limit(1);

  if (error) {
    console.error('Error checking knowledge base:', error);
    return false;
  }

  return data && data.length > 0;
}

async function initializeKnowledgeBase(supabase: any): Promise<string> {
  console.log('Initializing knowledge base...');
  
  // Sample resume chunks - in production, you'd parse a PDF
  const resumeChunks = [
    'Aakash Kunarapu is a Data Scientist and ML Engineer with M.S. Computer Science from Kent State University. He specializes in building high-throughput data pipelines and predictive models.',
    'Experience at Genpact (Meta Platforms) as Data Scientist / Platform Compliance Analyst from Jan 2023 – Jul 2023. Audited Facebook Login and Account Kit integrations for 400+ apps.',
    'Built gradient-boosted risk-scoring model using scikit-learn with 25 features. Top-20 list caught 78% of violations and cut manual review hours by 25%.',
    'Designed PySpark pipelines in Airflow to ingest daily events into Redshift and power Tableau dashboards for near real-time compliance visibility.',
    'Skills include Python, SQL, PySpark, scikit-learn, TensorFlow, NetworkX, Tableau, Docker, Kubernetes, AWS, and GCP.',
    'Projects include Skytrax Reviews Analysis with VADER sentiment analysis, Marvel Universe Network Analysis with NetworkX, and Sepsis Detection Ensemble with LSTM-GBM stacking.',
    'Education: M.S. Computer Science from Kent State University (Expected May 2025) and B.C.A. Computer Applications from Kakatiya University (May 2022).',
    'Certifications include Python for Data Science & Machine Learning, British Airways Data Science Job Simulation, Big Data Analytics with Hadoop & Apache Spark.',
    'Contact information: Located in Kent, OH. Phone: +1 330-281-0912. Email: aakashkunarapu17@gmail.com. LinkedIn: linkedin.com/in/aakash-kunarapu-80a55424b/',
    'Technical expertise in machine learning algorithms, statistical analysis, data visualization, feature engineering, and operational monitoring using Agile practices.'
  ];

  // Generate embeddings and insert chunks
  for (let i = 0; i < resumeChunks.length; i++) {
    const content = resumeChunks[i];
    const embedding = await generateEmbedding(content);
    
    const { error } = await supabase
      .from('resume_chunks')
      .insert({
        content,
        embedding
      });

    if (error) {
      console.error(`Error inserting chunk ${i}:`, error);
    } else {
      console.log(`Inserted chunk ${i + 1}/${resumeChunks.length}`);
    }
  }

  return `Knowledge base initialized with ${resumeChunks.length} resume chunks.`;
}

async function searchSimilarChunks(supabase: any, queryEmbedding: number[], limit = 5) {
  const { data, error } = await supabase.rpc('match_resume_chunks', {
    query_embedding: queryEmbedding,
    match_threshold: 0.75,
    match_count: limit
  });

  if (error) {
    console.error('Error searching chunks:', error);
    return [];
  }

  return data || [];
}

async function callOpenAI(messages: any[], openaiKey?: string) {
  if (!openaiKey) {
    // Fallback to a simple response when no OpenAI key
    return "I'd be happy to help you learn more about Aakash's background and experience. Please ask me specific questions about his skills, projects, or work experience.";
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.8,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.2,
      max_tokens: 500,
      stream: false
    })
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${result.error?.message || 'Unknown error'}`);
  }

  return result.choices[0].message.content;
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

    const { query, history = [] }: RequestBody = await req.json()

    // Check if knowledge base exists, initialize if needed
    const kbReady = await checkKnowledgeBase(supabaseClient);
    let initMessage = '';
    
    if (!kbReady) {
      console.log('Knowledge base empty, initializing...');
      initMessage = await initializeKnowledgeBase(supabaseClient);
    }

    // Generate embedding for the query
    console.log('Generating embedding for query:', query);
    const queryEmbedding = await generateEmbedding(query);

    // Search for similar resume chunks
    console.log('Searching for similar chunks...');
    const similarChunks = await searchSimilarChunks(supabaseClient, queryEmbedding);

    // Build context from chunks
    const context = similarChunks.map((chunk: any, index: number) => 
      `[C-${String(index + 1).padStart(2, '0')}] ${chunk.content}`
    ).join('\n\n');

    // Build conversation history summary (last 3 turns)
    const recentHistory = history.slice(-6);
    const historyText = recentHistory.map(turn => `${turn.role.toUpperCase()}: ${turn.content}`).join('\n');

    // Build system prompt
    const systemPrompt = `You are ResumeBot, a friendly career assistant for Aakash Kunarapu.

INSTRUCTIONS:
• Answer ONLY from the provided context about Aakash's resume
• Re-phrase information - never copy more than 10 words in a row
• Vary your wording each time to keep responses fresh
• Cite relevant chunks using their IDs like [C-01, C-03]
• If the resume doesn't contain the answer, say: "I'm not sure — that isn't in my resume."
• Keep responses conversational and helpful for recruiters

USER_HISTORY_SUMMARY:
${historyText || 'No previous conversation'}

CONTEXT:
${context || 'No relevant context found'}`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ];

    // Get OpenAI key from secrets
    const openaiKey = Deno.env.get('OPENAI_KEY');
    
    console.log('Generating response...');
    const response = await callOpenAI(messages, openaiKey);

    // Add chunk citations if context was found
    let finalResponse = response;
    if (similarChunks.length > 0) {
      const citations = similarChunks.map((_: any, index: number) => `C-${String(index + 1).padStart(2, '0')}`);
      if (!finalResponse.includes('[C-')) {
        finalResponse += ` [${citations.slice(0, 3).join(', ')}]`;
      }
    }

    return new Response(
      JSON.stringify({ 
        response: finalResponse,
        chunks_found: similarChunks.length,
        citations: similarChunks.map((_: any, index: number) => `C-${String(index + 1).padStart(2, '0')}`),
        kb_ready: true,
        init_message: initMessage || undefined
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Error in askResume function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Sorry, I encountered an error processing your question. Please try again.',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
