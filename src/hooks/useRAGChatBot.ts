import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface RAGResponse {
  response: string;
  chunks_found: number;
  citations: string[];
  error?: string; // Add optional error property
}

export const useRAGChatBot = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        // Initialize Supabase client
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          console.warn('Supabase credentials not found in environment variables');
          setIsInitialized(false);
          return;
        }

        const client = createClient(supabaseUrl, supabaseAnonKey);
        setSupabase(client);

        // Check if embeddings are ready
        const { data, error } = await client
          .from('resume_chunks')
          .select('id')
          .not('embedding', 'is', null)
          .limit(1);

        if (error) {
          console.error('Error checking embeddings:', error);
          setIsInitialized(false);
          return;
        }

        if (data && data.length > 0) {
          console.log('RAG ChatBot initialized successfully');
          setIsInitialized(true);
        } else {
          console.log('No embeddings found, triggering embedding process...');
          // Trigger embedding process
          await triggerEmbedding();
        }
      } catch (error) {
        console.error('Failed to initialize RAG ChatBot:', error);
        setIsInitialized(false);
      }
    };

    initializeSupabase();
  }, []);

  const triggerEmbedding = async () => {
    try {
      const response = await fetch('/functions/v1/embedResume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Embedding result:', result);
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Error triggering embedding:', error);
    }
  };

  const generateResponse = async (query: string, history: ChatTurn[] = []): Promise<string> => {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    try {
      const response = await fetch('/functions/v1/askResume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          history: history.slice(-6) // Last 3 exchanges
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: RAGResponse = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      console.log(`RAG response generated with ${result.chunks_found} relevant chunks`);
      return result.response;
    } catch (error) {
      console.error('Error generating RAG response:', error);
      throw error;
    }
  };

  return {
    generateResponse,
    isInitialized,
    triggerEmbedding
  };
};
