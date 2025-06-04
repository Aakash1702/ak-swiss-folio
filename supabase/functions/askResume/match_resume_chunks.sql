
-- Create the match_resume_chunks function for vector similarity search
CREATE OR REPLACE FUNCTION match_resume_chunks(
  query_embedding VECTOR(384),
  match_threshold FLOAT DEFAULT 0.75,
  match_count INT DEFAULT 5
)
RETURNS TABLE(
  id UUID,
  content TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    resume_chunks.id,
    resume_chunks.content,
    1 - (resume_chunks.embedding <=> query_embedding) AS similarity
  FROM resume_chunks
  WHERE 1 - (resume_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY resume_chunks.embedding <=> query_embedding
  LIMIT match_count;
$$;
