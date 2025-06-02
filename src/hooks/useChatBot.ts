
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
        
        // Check WebGPU availability properly
        const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;
        let device: 'webgpu' | 'cpu' = 'cpu';
        let embeddingPipeline = null;
        let generationPipeline = null;

        if (hasWebGPU) {
          try {
            device = 'webgpu';
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
        } else {
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
      // Use keyword matching as fallback but be more selective
      const lowerQuery = query.toLowerCase();
      const queryWords = lowerQuery.split(' ').filter(word => word.length > 2);
      
      const relevantItems = RESUME_DATA.filter(item => 
        queryWords.some(word => item.text.toLowerCase().includes(word)) ||
        queryWords.some(word => item.category.toLowerCase().includes(word))
      );
      
      if (relevantItems.length > 0) {
        return relevantItems.slice(0, 3).map(item => item.text).join('\n');
      }
      return RESUME_DATA.slice(0, 2).map(item => item.text).join('\n');
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
        .slice(0, 3);

      return relevantItems.map(item => item.text).join('\n');
    } catch (error) {
      console.error('Error finding relevant context:', error);
      return RESUME_DATA.slice(0, 2).map(item => item.text).join('\n');
    }
  };

  const generateSimpleResponse = (query: string, context: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Handle greetings naturally
    if (lowerQuery.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return "Hello! I'm Aakash Kunarapu, a Data Scientist currently pursuing my Master's in Computer Science at Kent State University. I'd be happy to discuss my experience in machine learning, data analytics, or any of my projects. What would you like to know?";
    }
    
    // Handle general questions about the person
    if (lowerQuery.includes('who are you') || lowerQuery.includes('tell me about yourself') || lowerQuery.includes('introduce yourself')) {
      return "I'm Aakash Kunarapu, a passionate Data Scientist with hands-on experience at Genpact working on Meta Platforms projects. I'm currently completing my Master's in Computer Science at Kent State University. My expertise spans machine learning, big data analytics, and building scalable data pipelines. I've successfully developed risk-scoring models that achieved 78% violation detection rates and built systems that improved platform performance by 12%. What specific aspects of my background interest you most?";
    }
    
    // Handle experience questions with context
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('job') || lowerQuery.includes('career')) {
      return "During my time at Genpact, I worked as a Data Scientist on Meta Platforms projects where I made significant contributions to platform security and compliance. I audited over 400 applications, designed machine learning models using scikit-learn that caught 78% of violations, and built robust PySpark data pipelines. One of my proudest achievements was reducing manual review hours by 25% while simultaneously improving first-time login success rates by 12% month-over-month. The role required deep expertise in Python, SQL, and working with large-scale data systems. What aspects of this experience would you like me to elaborate on?";
    }
    
    // Handle education questions
    if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university') || lowerQuery.includes('study')) {
      return "I'm currently pursuing my Master's in Computer Science at Kent State University, with an expected graduation in May 2025. My coursework focuses on cutting-edge areas like Advanced Databases, Machine Learning, Graph Theory, and Big Data Analytics. Prior to this, I completed my Bachelor's in Computer Applications from Kakatiya University in India. The combination of theoretical knowledge from my studies and practical experience from industry has given me a well-rounded perspective on data science and software development. Are there specific courses or academic projects you'd like to hear about?";
    }
    
    // Handle technical skills
    if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('programming') || lowerQuery.includes('language') || lowerQuery.includes('tools')) {
      return "I have a comprehensive technical toolkit spanning multiple domains. My core programming languages include Python, SQL, Java, and JavaScript. In the machine learning space, I'm proficient with scikit-learn, TensorFlow, and specialized in NLP techniques like VADER sentiment analysis. For big data processing, I work extensively with Apache Spark, PySpark, and have experience with cloud platforms like AWS and GCP. I'm also skilled in data visualization using Tableau, Plotly, and various other tools. Additionally, I have DevOps experience with Docker, Kubernetes, and CI/CD pipelines. Which specific technology stack are you most interested in discussing?";
    }
    
    // Handle project questions
    if (lowerQuery.includes('project')) {
      return "I've worked on several impactful projects that showcase different aspects of data science. One notable project was analyzing over 3,900 Skytrax reviews for British Airways using VADER sentiment analysis, which revealed important insights about customer satisfaction patterns. I also conducted a fascinating network analysis of the Marvel Universe, analyzing 6,000+ characters and 160,000 interactions using NetworkX and community detection algorithms. In the healthcare domain, I developed an ensemble model for sepsis detection using LSTM and gradient boosting techniques on 40,000+ ICU records. Each project taught me something new about applying data science to real-world problems. Which type of project interests you most?";
    }
    
    // Handle contact/hiring questions
    if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach') || lowerQuery.includes('hire') || lowerQuery.includes('available')) {
      return "I'm actively seeking opportunities in data science and machine learning roles. You can reach me at aakashkunarapu17@gmail.com or call me at +1 330-281-0912. I'm currently based in Kent, OH, and I'm also available on LinkedIn. I'm particularly interested in roles that involve building scalable ML systems, working with large datasets, and solving complex business problems through data-driven insights. I'd love to discuss how my experience could contribute to your team's goals!";
    }
    
    // Handle questions about specific technologies mentioned in context
    const contextLower = context.toLowerCase();
    if (lowerQuery.includes('python') && contextLower.includes('python')) {
      return "Python is my primary programming language for data science work. I've used it extensively for data analysis, machine learning model development, and building data pipelines. At Genpact, I leveraged Python for parsing OAuth logs, developing scikit-learn models, and automating various data processing tasks. I'm comfortable with libraries like pandas, numpy, scikit-learn, TensorFlow, and many others. Python's versatility makes it perfect for end-to-end data science workflows.";
    }
    
    if (lowerQuery.includes('machine learning') || lowerQuery.includes('ml')) {
      return "Machine learning is at the core of my expertise. I've built production-ready models including gradient-boosted risk-scoring systems that achieved 78% violation detection rates, LSTM networks for healthcare analytics, and ensemble methods for various prediction tasks. I'm experienced with both supervised and unsupervised learning techniques, feature engineering, model validation, and deployment. My approach always focuses on solving real business problems with measurable impact.";
    }
    
    // Default conversational response
    return `That's an interesting question! Based on my experience as a data scientist, I can share insights about ${lowerQuery.split(' ').slice(0, 3).join(' ')}. Having worked on projects ranging from large-scale platform compliance to healthcare analytics, I've gained valuable experience in applying data science to solve real-world challenges. My background includes both the technical depth from my Master's studies and practical experience from working at Genpact on Meta Platforms. What specific aspect would you like to explore further?`;
  };

  const generateResponse = async (userQuery: string): Promise<string> => {
    if (!isInitialized) {
      return "I'm still getting ready to chat. Please give me just a moment to initialize...";
    }

    try {
      const context = await findRelevantContext(userQuery);
      
      if (useSimpleMode || !generator) {
        return generateSimpleResponse(userQuery, context);
      }

      const prompt = `You are Aakash Kunarapu responding to a question. Use the provided context about your background to give a helpful, conversational, and professional response. Be natural and personable while staying factual.

Background Context:
${context}

Question: ${userQuery}

Respond as Aakash in first person, being conversational and helpful:`;

      const response = await generator(prompt, {
        max_length: 300,
        temperature: 0.8,
        do_sample: true,
        top_p: 0.9,
        repetition_penalty: 1.1
      });

      let answer = response[0]?.generated_text || '';
      answer = answer.replace(prompt, '').replace(/^Response[:\s]*/i, '').trim();
      
      if (!answer || answer.length < 30) {
        return generateSimpleResponse(userQuery, context);
      }

      return answer;
    } catch (error) {
      console.error('Error generating response:', error);
      const context = RESUME_DATA.slice(0, 2).map(item => item.text).join('\n');
      return generateSimpleResponse(userQuery, context);
    }
  };

  return {
    generateResponse,
    isInitialized
  };
};
