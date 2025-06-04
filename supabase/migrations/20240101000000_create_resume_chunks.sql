
-- Create resume_chunks table with vector embeddings
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS resume_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding VECTOR(384),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS resume_chunks_embedding_idx 
ON resume_chunks USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Insert sample resume chunks (you can replace with your actual resume content)
INSERT INTO resume_chunks (id, content) VALUES
('c1', 'Aakash Kunarapu is a Data Scientist and ML Engineer with M.S. Computer Science from Kent State University. He specializes in building high-throughput data pipelines and predictive models.'),
('c2', 'Experience at Genpact (Meta Platforms) as Data Scientist / Platform Compliance Analyst from Jan 2023 – Jul 2023. Audited Facebook Login and Account Kit integrations for 400+ apps.'),
('c3', 'Built gradient-boosted risk-scoring model using scikit-learn with 25 features. Top-20 list caught 78% of violations and cut manual review hours by 25%.'),
('c4', 'Designed PySpark pipelines in Airflow to ingest daily events into Redshift and power Tableau dashboards for near real-time compliance visibility.'),
('c5', 'Skills include Python, SQL, PySpark, scikit-learn, TensorFlow, NetworkX, Tableau, Docker, Kubernetes, AWS, and GCP.'),
('c6', 'Projects include Skytrax Reviews Analysis with VADER sentiment analysis, Marvel Universe Network Analysis with NetworkX, and Sepsis Detection Ensemble with LSTM-GBM stacking.'),
('c7', 'Education: M.S. Computer Science from Kent State University (Expected May 2025) and B.C.A. Computer Applications from Kakatiya University (May 2022).'),
('c8', 'Certifications include Python for Data Science & Machine Learning, British Airways Data Science Job Simulation, Big Data Analytics with Hadoop & Apache Spark.'),
('c9', 'Contact information: Located in Kent, OH. Phone: +1 330-281-0912. Email: aakashkunarapu17@gmail.com. LinkedIn: linkedin.com/in/aakash-kunarapu-80a55424b/'),
('c10', 'Technical expertise in machine learning algorithms, statistical analysis, data visualization, feature engineering, and operational monitoring using Agile practices.')
ON CONFLICT (id) DO NOTHING;
