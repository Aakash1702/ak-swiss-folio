
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
          { device: 'cpu' }
        );
        
        // Initialize text generation model
        const generationPipeline = await pipeline(
          'text2text-generation',
          'Xenova/flan-t5-small',
          { device: 'cpu' }
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
              embedding: Array.from(embedding.data)
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
    if (!embedder || knowledgeBase.length === 0) return '';

    try {
      const queryEmbedding = await embedder(query);
      const queryVector = Array.from(queryEmbedding.data);

      const similarities = knowledgeBase.map((item) => ({
        ...item,
        similarity: item.embedding ? cosineSimilarity(queryVector, item.embedding) : 0
      }));

      const relevantItems = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)
        .filter(item => item.similarity > 0.3);

      return relevantItems.map(item => item.text).join(' ');
    } catch (error) {
      console.error('Error finding relevant context:', error);
      return '';
    }
  };

  const generateResponse = async (userQuery: string): Promise<string> => {
    if (!generator || !isInitialized) {
      return "I'm still initializing. Please try again in a moment.";
    }

    try {
      const context = await findRelevantContext(userQuery);
      
      if (!context) {
        return "I don't have specific information about that in Aakash's resume. Could you ask about his work experience, education, skills, or projects?";
      }

      const prompt = `Based on the following information about Aakash Kunarapu: ${context}

Question: ${userQuery}

Please provide a professional and helpful response as if you are representing Aakash. Be conversational but professional.`;

      const response = await generator(prompt, {
        max_length: 200,
        temperature: 0.7,
        do_sample: true
      });

      let answer = response[0]?.generated_text || '';
      
      // Clean up the response
      answer = answer.replace(prompt, '').trim();
      
      if (!answer || answer.length < 10) {
        // Fallback response using the context directly
        if (userQuery.toLowerCase().includes('experience') || userQuery.toLowerCase().includes('work')) {
          return "Aakash has experience as a Data Scientist and Platform Compliance Analyst at Genpact working on Meta Platforms projects. He audited 400+ apps, built risk-scoring models that achieved 78% violation detection, and created PySpark pipelines that boosted login success by 12%. He's skilled in Python, SQL, machine learning, and data visualization.";
        } else if (userQuery.toLowerCase().includes('education') || userQuery.toLowerCase().includes('degree')) {
          return "Aakash is pursuing his M.S. in Computer Science from Kent State University (expected May 2025) with coursework in Advanced Databases, Machine Learning, Graph Theory, and Big Data Analytics. He previously completed his B.C.A. in Computer Applications from Kakatiya University, India in 2022.";
        } else if (userQuery.toLowerCase().includes('skills') || userQuery.toLowerCase().includes('technologies')) {
          return "Aakash is proficient in Python, SQL, Java, and JavaScript. He has extensive experience with big data tools like PySpark and Apache Spark, ML frameworks like scikit-learn and TensorFlow, visualization tools like Tableau and Plotly, and cloud platforms like AWS and GCP. He's also skilled in Docker, Kubernetes, and CI/CD practices.";
        } else if (userQuery.toLowerCase().includes('projects')) {
          return "Aakash has worked on several impressive projects including sentiment analysis of airline reviews, network analysis of Marvel universe characters, sepsis detection using ensemble methods, grid risk forecasting with Bayesian networks, and customer churn prediction with 93% accuracy using Random Forest and SHAP interpretation.";
        } else {
          return `Based on Aakash's background: ${context.substring(0, 200)}... Feel free to ask more specific questions about his experience, education, skills, or projects!`;
        }
      }

      return answer;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble processing your request right now. Please try asking about Aakash's work experience, education, technical skills, or projects.";
    }
  };

  return {
    generateResponse,
    isInitialized
  };
};
