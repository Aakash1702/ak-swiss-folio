
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Your resume content, pre-loaded into the application.
const preLoadedResumeText = `
Aakash Kunarapu

Kent, OH +1 330-281-0912 | aakashkunarapul7@gmail.com | Aakash Kunarapu

Education
Kent State University, OH, Kent, OH
M.S in Computer science, Graduation Date: May 2025

Kakatiya University, Warangal, Wanrangal, TG
Bachelor's in computer applications, Graduation Date: May 2022

Work Experience
Genpact - Data Scientist / Platform Compliance Analyst (Meta Platforms)
Jan 2023-Jul 2023
Audited Facebook Login and Account Kit integrations for 400 web & mobile apps, parsing OAuth transaction logs and SDK telemetry with Python/SQL to surface common infringements and map violation trends by platform and region.
Designed a scikit-learn risk-scoring model (gradient-boosted trees) that used 25 engineered features, permission mix, redirect-URI entropy, error-rate drift, user-drop-off to rank integrations by likelihood of non-compliance; the top-20 list caught 78% of true violations and cut manual review hours 25%.
Built PySpark pipelines in Airflow to ingest daily authentication events into Redshift and power a Tableau dashboard for product, legal, and engineering stakeholders, giving near-real-time visibility into compliance status, incident spikes, and login-success KPIs.
Worked directly with external developer teams to translate data findings into concrete remediation steps, guiding 120 apps to full guideline alignment and boosting first-time-login success rates by 12% month-over-month.

Project Experience
Skytrax Reviews Analysis for British Airways (Data Science Virtual Internship):
Analyzed approximately 3,940 Skytrax reviews using sentiment analysis (VADER) and NLP techniques.
Identified key sentiment trends: 56% positive, 41% negative, highlighting critical customer insights.
Extracted major positive and negative themes (e.g., cabin crew service, premium economy experience).
Recommended actionable insights for improving customer satisfaction, particularly on long-haul routes.

Network Analysis of Marvel Universe Characters:
Performed large-scale network analysis of 6,000+ Marvel characters and 160,000 interactions in NetworkX, computing centrality metrics to surface the most influential nodes.
Discovered latent communities and alliances via Greedy Modularity and Girvan-Newman algorithms, then evaluated network density, transitivity, core-periphery structure, and overall robustness.
Created interactive Plotly and static Matplotlib visualizations that translated complex graph insights into clear, stakeholder-ready stories while honing advanced data-wrangling and graph-construction skills.

Sepsis Detection with LSTM-GBM Ensemble:
Built a data pipeline that integrated time-series preprocessing and model stacking for 40,000+ ICU records.
Engineered features from clinical signals and deployed ensemble models to detect anomalies, simulating fraud detection logic.
Validated using AUC-ROC, F1-score, and precision-based metrics critical in fraud classification.

Bayesian Grid Risk Forecasting:
Built probabilistic models for grid stability with Monte Carlo simulations and Bayesian networks, highlighting experience in complex risk modeling and statistical learning.
Delivered insights via dashboards, emphasizing effective communication of technical findings to stakeholders.

Customer Churn Prediction via Data Mining:
Modeled behavior prediction using Random Forest (93%) and Decision Trees, with heavy emphasis on imbalanced data handling.
Applied SHAP-based feature interpretation, replicable for explaining fraud model decisions in production.
Optimized end-to-end flow from data wrangling to actionable insight delivery.

Skills and Interests
Languages & Tools: Python, SQL, PySpark, Java, PostgreSQL, MongoDB, Redshift.
Big Data & Processing: Apache Spark, Data Pipelines, Feature Engineering.
Machine Learning: Supervised & Unsupervised Learning, Linear & Logistic Regression, Decision Trees, Random Forest, SVM, K-Means, Naive Bayes, Model Evaluation & Tuning (Cross-Validation, Grid Search), Classification, Gradient Boosting, Feature Engineering, NLP Algorithms, Data Science Toolkits, Anaconda, TensorFlow.
Graph Analytics: NetworkX, Gephi, Graph Features, Connectivity Analysis.
ML Deployment: Model Hosting, API Integration, Data Parsing, Operational Monitoring.
Statistical Analysis: Hypothesis Testing, Regression, Distributions, PCA.
Cloud & SaaS: AWS, GCP, Slack, Okta (basic familiarity), Google Workspace.
Libraries: Pandas, NumPy, Scikit-learn, PyMC3.
Visualization: Power BI, Tableau, Dashboards.
Software Practices: Agile, Version Control (Git), Object-Oriented Design.

Certifications
Python for data science and machine learning essential training.
British Airways Data Science Job Simulation.
Big Data Analytics with Hadoop and Apache Spark.
Introduction to prompt engineering for generative AI.
`;

const GeminiChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Aakash's AI assistant powered by Google Gemini. I can answer detailed questions about his experience, skills, projects, and background. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAskResume = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuestion = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const prompt = `
      You are an AI assistant tasked with answering questions about the provided resume context.
      Your responses must be generative, human-like, and varied, avoiding direct repetition or keyword matching.
      Crucially, if a question asks about a role, experience, or skill *not explicitly named* in the resume, your goal is to analyze the resume for *transferable* skills, experiences, and accomplishments that demonstrate capability or potential for that area.
      Frame your answer constructively, highlighting how existing strengths could apply or be valuable in the context of the question.
      Do NOT state that information is "not mentioned" or "not present." Instead, infer and elaborate on how the provided experience makes Aakash capable or suitable.
      If there is absolutely no relevant information or transferable skill in the resume to even infer capability, then politely state that the resume does not provide sufficient detail to answer the specific question from that perspective.

      Resume Context:
      ---
      ${preLoadedResumeText}
      ---

      Question: "${currentQuestion}"

      Answer:
      `;

      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1024,
        },
      };

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorJson = await response.json();
          errorDetails = JSON.stringify(errorJson, null, 2);
        } catch (jsonError) {
          errorDetails = await response.text();
        }

        if (response.status === 401) {
          throw new Error(`Authentication failed (401). This typically means there's an issue with the API key or its configuration.`);
        } else {
          throw new Error(`API error: ${response.status} - ${response.statusText}. Details: ${errorDetails}`);
        }
      }

      const result = await response.json();
      console.log("Gemini API Full Result:", JSON.stringify(result, null, 2));

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: text,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        let modelError = 'No valid content generated. The model might have found the prompt or generated content problematic.';
        if (result.promptFeedback && result.promptFeedback.blockReason) {
          modelError = `Response blocked due to safety reasons: ${result.promptFeedback.blockReason}`;
        } else if (result.candidates && result.candidates.length > 0 && result.candidates[0].finishReason) {
          modelError = `Generation finished with reason: ${result.candidates[0].finishReason}. This might indicate safety or other issues.`;
        }
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `No valid response from the AI: ${modelError}. Please try a different question or rephrase.`,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }

    } catch (error) {
      console.error("Error generating answer:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Failed to get answer: ${error.message}. Please check your input and try again.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskResume();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 animate-pulse relative"
          >
            <MessageCircle className="w-8 h-8" />
            <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400 animate-bounce" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-50 flex flex-col shadow-2xl border-0 bg-white">
          <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/lovable-uploads/63457843-c51b-4e97-a03e-9927d5c4f2d2.png" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    ResumeBot
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                  </h3>
                  <p className="text-xs opacity-90">Gemini-Powered Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {!message.isUser && (
                      <Bot className="w-4 h-4 mt-0.5 text-blue-600" />
                    )}
                    {message.isUser && (
                      <User className="w-4 h-4 mt-0.5" />
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Aakash's experience..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleAskResume}
                disabled={isLoading || !inputMessage.trim()}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default GeminiChatBot;
