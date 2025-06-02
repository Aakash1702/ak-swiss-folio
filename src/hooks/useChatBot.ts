
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
  const [useSimpleMode, setUseSimpleMode] = useState(false);

  useEffect(() => {
    const initializeModels = async () => {
      try {
        console.log('Initializing AI models...');
        
        // Try WebGPU first, fallback to CPU
        let device = 'webgpu';
        let embeddingPipeline = null;
        let generationPipeline = null;

        try {
          // Test WebGPU availability
          if (!navigator.gpu) {
            throw new Error('WebGPU not available');
          }

          embeddingPipeline = await pipeline(
            'feature-extraction',
            'Xenova/all-MiniLM-L6-v2',
            { device: 'webgpu' }
          );
          console.log('WebGPU embedding model loaded successfully');
        } catch (webgpuError) {
          console.log('WebGPU failed, falling back to CPU for embeddings:', webgpuError);
          device = 'cpu';
          embeddingPipeline = await pipeline(
            'feature-extraction',
            'Xenova/all-MiniLM-L6-v2',
            { device: 'cpu' }
          );
          console.log('CPU embedding model loaded successfully');
        }

        try {
          generationPipeline = await pipeline(
            'text2text-generation',
            'Xenova/flan-t5-small',
            { device: device }
          );
          console.log(`${device} generation model loaded successfully`);
        } catch (genError) {
          console.log('Text generation model failed, using simple mode:', genError);
          setUseSimpleMode(true);
        }

        setEmbedder(embeddingPipeline);
        setGenerator(generationPipeline);

        // Create embeddings for knowledge base
        if (embeddingPipeline) {
          console.log('Creating embeddings for knowledge base...');
          const embeddedKB = await Promise.all(
            RESUME_DATA.map(async (item) => {
              try {
                const result = await embeddingPipeline(item.text);
                const embedding = Array.isArray(result.data) ? result.data : Array.from(result.data || []);
                return {
                  ...item,
                  embedding: embedding as number[]
                };
              } catch (error) {
                console.log('Error creating embedding for item:', error);
                return { ...item, embedding: [] };
              }
            })
          );
          setKnowledgeBase(embeddedKB);
          console.log('Knowledge base embeddings created successfully');
        } else {
          setKnowledgeBase(RESUME_DATA);
        }

        setIsInitialized(true);
        console.log('AI models initialized successfully!');
      } catch (error) {
        console.error('Error initializing models:', error);
        setUseSimpleMode(true);
        setKnowledgeBase(RESUME_DATA);
        setIsInitialized(true);
      }
    };

    initializeModels();
  }, []);

  const cosineSimilarity = (a: number[], b: number[]): number => {
    if (!a || !b || a.length === 0 || b.length === 0) return 0;
    const dotProduct = a.reduce((sum, val, i) => sum + val * (b[i] || 0), 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  };

  const findRelevantContext = async (query: string): Promise<string> => {
    if (!embedder || knowledgeBase.length === 0 || useSimpleMode) {
      // Use keyword matching as fallback
      const lowerQuery = query.toLowerCase();
      const relevantItems = RESUME_DATA.filter(item => 
        item.text.toLowerCase().includes(lowerQuery.split(' ')[0]) ||
        lowerQuery.includes(item.category)
      );
      
      if (relevantItems.length > 0) {
        return relevantItems.slice(0, 3).map(item => item.text).join(' ');
      }
      return RESUME_DATA.slice(0, 4).map(item => item.text).join(' ');
    }

    try {
      const queryResult = await embedder(query);
      const queryVector = Array.isArray(queryResult.data) ? queryResult.data : Array.from(queryResult.data || []);

      const similarities = knowledgeBase.map((item) => ({
        ...item,
        similarity: item.embedding && item.embedding.length > 0 
          ? cosineSimilarity(queryVector as number[], item.embedding) 
          : 0
      }));

      const relevantItems = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 4);

      return relevantItems.map(item => item.text).join(' ');
    } catch (error) {
      console.error('Error finding relevant context:', error);
      return RESUME_DATA.slice(0, 4).map(item => item.text).join(' ');
    }
  };

  const generateSimpleResponse = (query: string, context: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // More intelligent keyword-based responses
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job')) {
      return "I have significant experience as a Data Scientist at Genpact working on Meta Platforms projects. I've successfully audited 400+ applications, built machine learning models achieving 78% violation detection rates, and developed data pipelines that improved system performance by 12%. My work involved technologies like Python, SQL, scikit-learn, PySpark, and Airflow.";
    }
    
    if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university') || lowerQuery.includes('study')) {
      return "I'm currently pursuing my M.S. in Computer Science at Kent State University, expecting to graduate in May 2025. My coursework focuses on advanced databases, machine learning, graph theory, and big data analytics. I previously completed my B.C.A. in Computer Applications from Kakatiya University in India in 2022.";
    }
    
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming') || lowerQuery.includes('language')) {
      return "I'm proficient in Python, SQL, Java, and JavaScript. I have extensive experience with machine learning frameworks like scikit-learn and TensorFlow, big data technologies including Apache Spark and PySpark, and cloud platforms like AWS and GCP. I'm also skilled in data visualization using Tableau and Plotly, and DevOps tools like Docker and Kubernetes.";
    }
    
    if (lowerQuery.includes('project')) {
      return "I've worked on several impactful projects including sentiment analysis of airline reviews using VADER (analyzing 3,940+ reviews), network analysis of Marvel universe characters with 160,000+ interactions using NetworkX, healthcare analytics for sepsis detection using LSTM and gradient boosting models, and customer churn prediction achieving 93% accuracy with Random Forest and SHAP interpretation.";
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
      return "You can reach me at aakashkunarapu17@gmail.com or call me at +1 330-281-0912. I'm currently located in Kent, OH. You can also connect with me on LinkedIn at https://www.linkedin.com/in/aakash-kunarapu-80a55424b/.";
    }
    
    if (lowerQuery.includes('certification') || lowerQuery.includes('training')) {
      return "I have several relevant certifications including Python for Data Science & Machine Learning Essential Training, British Airways Data Science Job Simulation, Big Data Analytics with Hadoop & Apache Spark, and Introduction to Prompt Engineering for Generative AI. These certifications complement my practical experience in data science and machine learning.";
    }
    
    // Generate a contextual response based on the query
    const contextWords = context.toLowerCase().split(' ');
    const queryWords = query.toLowerCase().split(' ');
    const matchingWords = queryWords.filter(word => contextWords.includes(word));
    
    if (matchingWords.length > 0) {
      return `Based on my background in data science and machine learning, I can tell you that I have experience with ${matchingWords.join(', ')} among other technologies. I've worked extensively on data analysis, machine learning model development, and big data processing. My experience at Genpact involved building risk-scoring models and data pipelines that significantly improved system performance. Feel free to ask more specific questions about any aspect of my experience!`;
    }
    
    return `That's an interesting question! As a data scientist with experience in machine learning, Python, and big data analytics, I've worked on various challenging projects from sentiment analysis to network analysis and healthcare predictive modeling. My background includes both academic study at Kent State University and practical experience at Genpact working on Meta Platforms projects. What specific aspect of my experience would you like to know more about?`;
  };

  const generateResponse = async (userQuery: string): Promise<string> => {
    if (!isInitialized) {
      return "I'm still initializing. Please try again in a moment.";
    }

    try {
      const context = await findRelevantContext(userQuery);
      
      if (useSimpleMode || !generator) {
        return generateSimpleResponse(userQuery, context);
      }

      const prompt = `Based on the following information about Aakash Kunarapu, provide a helpful and conversational response to the question. Be professional but friendly, and use the information provided as context.

Context: ${context}

Question: ${userQuery}

Response:`;

      const response = await generator(prompt, {
        max_length: 200,
        temperature: 0.7,
        do_sample: true,
        top_p: 0.9,
        num_return_sequences: 1
      });

      let answer = response[0]?.generated_text || '';
      answer = answer.replace(prompt, '').replace('Response:', '').trim();
      
      if (!answer || answer.length < 20) {
        return generateSimpleResponse(userQuery, context);
      }

      return answer;
    } catch (error) {
      console.error('Error generating response:', error);
      const context = RESUME_DATA.slice(0, 3).map(item => item.text).join(' ');
      return generateSimpleResponse(userQuery, context);
    }
  };

  return {
    generateResponse,
    isInitialized
  };
};
