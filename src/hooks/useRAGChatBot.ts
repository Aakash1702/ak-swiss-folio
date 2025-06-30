
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
  error?: string;
  kb_ready?: boolean;
  init_message?: string;
}

export const useRAGChatBot = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!supabaseUrl || !supabaseAnonKey) {
          console.warn('Supabase credentials not found in environment variables');
          setIsInitialized(false);
          return;
        }

        const client = createClient(supabaseUrl, supabaseAnonKey);
        setSupabase(client);
        setIsInitialized(true); // We'll check KB status on first query
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        setIsInitialized(false);
      }
    };

    initializeSupabase();
  }, []);

  const generateResponse = async (query: string, history: ChatTurn[] = []): Promise<string> => {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    try {
      console.log('Sending query to askResume:', query);
      
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

      if (result.init_message) {
        console.log('Knowledge base initialized:', result.init_message);
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
    isInitialized
  };
};
