
import { useState, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';

interface KnowledgeBase {
  text: string;
  embedding?: number[];
  category: string;
}

const RESUME_DATA: KnowledgeBase[] = [
  {
    text: "Aakash Kunarapu is a Data Scientist and Platform Compliance Analyst with experience at Genpact working on Meta Platforms projects. He has expertise in Python, SQL, machine learning, and data pipeline development.",
    category: "overview"
  },
  {
    text: "Education: M.S. in Computer Science from Kent State University, OH (Expected May 2025). Key courses include Advanced Databases, Machine Learning, Graph Theory, and Big Data Analytics. Previously completed B.C.A. in Computer Applications from Kakatiya University, Warangal, TG (May 2022).",
    category: "education"
  },
  {
    text: "Work Experience at Genpact (Meta Platforms) from Jan 2023 to Jul 2023 as Data Scientist / Platform Compliance Analyst. Audited Facebook Login and Account Kit integrations for 400+ apps, parsing OAuth logs and SDK telemetry with Python/SQL. Designed gradient-boosted risk-scoring model using scikit-learn with 25 features that caught 78% of violations and cut manual review hours by 25%. Built PySpark pipelines in Airflow to ingest daily events into Redshift and power Tableau dashboards. Guided 120 developer teams through remediation steps, boosting first-time-login success by 12% MoM.",
    category: "experience"
  },
  {
    text: "Technical Skills: Languages - Python, SQL, Java, JavaScript. Big Data - PySpark, Apache Spark, Data Pipelines, Redshift, MongoDB. ML & Statistics - scikit-learn, TensorFlow, NLP (VADER), Hypothesis Testing, PCA. Graph Analytics - NetworkX, Gephi, Connectivity Analysis. Visualization - Tableau, Plotly, Matplotlib, Power BI. Dev & Deployment - Docker, Kubernetes, Airflow, Git, CI/CD. Cloud & SaaS - AWS, GCP, Supabase, Okta, Slack.",
    category: "skills"
  },
  {
    text: "Project: Skytrax Reviews Analysis for British Airways Virtual Internship. Analyzed ~3,940 reviews with VADER sentiment analysis, uncovered 56% positive vs 41% negative trends. Extracted themes about cabin crew service and premium economy, recommended satisfaction improvements. Technologies: Python, VADER, Sentiment Analysis, Data Analysis.",
    category: "projects"
  },
  {
    text: "Project: Marvel Universe Network Analysis. NetworkX analysis of 6,000+ characters & 160,000 interactions. Computed centrality and detected communities via Girvan–Newman algorithm. Built interactive Plotly & Matplotlib visualizations. Technologies: NetworkX, Plotly, Matplotlib, Graph Theory, Community Detection.",
    category: "projects"
  },
  {
    text: "Project: Sepsis Detection Ensemble. Developed LSTM-GBM stacking pipeline on 40,000+ ICU records, validated via AUC-ROC & F1-score. Technologies: LSTM, Gradient Boosting, TensorFlow, Healthcare Analytics.",
    category: "projects"
  },
  {
    text: "Project: Bayesian Grid Risk Forecasting. Monte Carlo & Bayesian network models for grid stability, delivered stakeholder dashboards. Technologies: Bayesian Networks, Monte Carlo, Risk Analysis, Dashboard Development.",
    category: "projects"
  },
  {
    text: "Project: Customer Churn Prediction. Random Forest model achieving 93% accuracy, applied SHAP for feature interpretation to drive production insights. Technologies: Random Forest, SHAP, Feature Engineering, Production ML.",
    category: "projects"
  },
  {
    text: "Certifications: Python for Data Science & Machine Learning Essential Training, British Airways Data Science Job Simulation, Big Data Analytics with Hadoop & Apache Spark, Introduction to Prompt Engineering for Generative AI.",
    category: "certifications"
  },
  {
    text: "Contact Information: Email - aakashkunarapu17@gmail.com, Phone - +1 330-281-0912, Location - Kent, OH, LinkedIn - https://www.linkedin.com/in/aakash-kunarapu-80a55424b/",
    category: "contact"
  }
];

export const useChatBot = () => {
  const [embedder, setEmbedder] = useState<any>(null);
  const [generator, setGenerator] = useState<any>(null);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeModels = async () => {
      try {
        console.log('Initializing AI models...');
        
        // Initialize embedding model
        const embeddingPipeline = await pipeline(
          'feature-extraction',
          'Xenova/all-MiniLM-L6-v2',
          { device: 'webgpu' }
        );
        
        // Initialize text generation model
        const generationPipeline = await pipeline(
          'text2text-generation',
          'Xenova/flan-t5-small',
          { device: 'webgpu' }
        );

        setEmbedder(embeddingPipeline);
        setGenerator(generationPipeline);

        // Create embeddings for knowledge base
        console.log('Creating embeddings for knowledge base...');
        const embeddedKB = await Promise.all(
          RESUME_DATA.map(async (item) => {
            const embedding = await embeddingPipeline(item.text);
            return {
              ...item,
              embedding: Array.from(embedding.data) as number[]
            };
          })
        );

        setKnowledgeBase(embeddedKB);
        setIsInitialized(true);
        console.log('AI models initialized successfully!');
      } catch (error) {
        console.error('Error initializing models:', error);
      }
    };

    initializeModels();
  }, []);

  const cosineSimilarity = (a: number[], b: number[]): number => {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };

  const findRelevantContext = async (query: string): Promise<string> => {
    if (!embedder || knowledgeBase.length === 0) {
      // Return general overview if embeddings aren't ready
      return RESUME_DATA.slice(0, 3).map(item => item.text).join(' ');
    }

    try {
      const queryEmbedding = await embedder(query);
      const queryVector = Array.from(queryEmbedding.data) as number[];

      const similarities = knowledgeBase.map((item) => ({
        ...item,
        similarity: item.embedding ? cosineSimilarity(queryVector, item.embedding) : 0
      }));

      // Get top relevant items with lower threshold for more inclusive results
      const relevantItems = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5) // Get more context
        .filter(item => item.similarity > 0.1); // Lower threshold

      // If no relevant items found, return general overview
      if (relevantItems.length === 0) {
        return RESUME_DATA.slice(0, 3).map(item => item.text).join(' ');
      }

      return relevantItems.map(item => item.text).join(' ');
    } catch (error) {
      console.error('Error finding relevant context:', error);
      return RESUME_DATA.slice(0, 3).map(item => item.text).join(' ');
    }
  };

  const generateResponse = async (userQuery: string): Promise<string> => {
    if (!generator || !isInitialized) {
      return "I'm still initializing. Please try again in a moment.";
    }

    try {
      const context = await findRelevantContext(userQuery);
      
      const prompt = `You are Aakash Kunarapu's AI assistant. Based on his background and experience, answer the following question in a professional, conversational manner as if you are representing him. Use the information provided but feel free to elaborate and be conversational.

Aakash's Background: ${context}

Question: ${userQuery}

Answer:`;

      const response = await generator(prompt, {
        max_length: 150,
        temperature: 0.8,
        do_sample: true,
        top_p: 0.9
      });

      let answer = response[0]?.generated_text || '';
      
      // Clean up the response
      answer = answer.replace(prompt, '').replace('Answer:', '').trim();
      
      if (!answer || answer.length < 15) {
        // Enhanced fallback responses based on query content
        const lowerQuery = userQuery.toLowerCase();
        
        if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
          return "I have valuable experience as a Data Scientist at Genpact working on Meta Platforms projects. I've audited 400+ applications, built machine learning models that achieved 78% violation detection rates, and created data pipelines that improved system performance by 12%. My work involved Python, SQL, scikit-learn, and big data technologies like PySpark and Airflow.";
        } else if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university')) {
          return "I'm currently pursuing my M.S. in Computer Science at Kent State University (graduating May 2025), focusing on advanced databases, machine learning, and big data analytics. I previously completed my B.C.A. in Computer Applications from Kakatiya University in India. My academic journey has given me a strong foundation in both theoretical concepts and practical applications.";
        } else if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming')) {
          return "I'm proficient in multiple programming languages including Python, SQL, Java, and JavaScript. I have extensive experience with machine learning frameworks like scikit-learn and TensorFlow, big data tools like Apache Spark and PySpark, and visualization platforms like Tableau and Plotly. I'm also skilled in cloud technologies (AWS, GCP), containerization (Docker, Kubernetes), and data pipeline orchestration with Airflow.";
        } else if (lowerQuery.includes('project')) {
          return "I've worked on several impactful projects including sentiment analysis of airline reviews using VADER, network analysis of Marvel universe characters with 160,000+ interactions, healthcare analytics for sepsis detection using LSTM and gradient boosting, and customer churn prediction achieving 93% accuracy. Each project showcases different aspects of my data science and machine learning expertise.";
        } else {
          return `Based on my background in data science and machine learning, I'd be happy to discuss how my experience might relate to your question. I'm currently pursuing my M.S. in Computer Science while having practical experience at Genpact working on Meta Platforms projects. Feel free to ask me more specific questions about my technical skills, projects, or career journey!`;
        }
      }

      return answer;
    } catch (error) {
      console.error('Error generating response:', error);
      return "Thanks for your question! I'm a data scientist with experience in machine learning, Python, and big data analytics. I've worked on various projects from sentiment analysis to network analysis and healthcare predictive modeling. Feel free to ask me more about my specific experiences or technical skills!";
    }
  };

  return {
    generateResponse,
    isInitialized
  };
};
