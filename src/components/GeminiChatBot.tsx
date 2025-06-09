
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, X, Send, Bot, User, Sparkles, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const GeminiChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Aakash's AI assistant powered by Google's Gemini. I can answer detailed questions about his experience, skills, projects, and background. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setTempApiKey(savedApiKey);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    if (!tempApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('gemini_api_key', tempApiKey);
    setApiKey(tempApiKey);
    setShowSettings(false);
    toast({
      title: "Success",
      description: "API key saved successfully!",
    });
  };

  const generateResponse = async (userMessage: string) => {
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are Aakash Kunarapu's personal AI assistant. Based on his portfolio information, answer questions about his background, experience, skills, and projects. 

            User question: ${userMessage}

            Portfolio Context:
            - M.S. Computer Science at Kent State University (expected May 2025)
            - Data Scientist/Platform Compliance Analyst at Genpact (Meta Platforms) Jan 2023 – Jul 2023
            - Built ML models, data pipelines, worked with Python, SQL, PySpark, scikit-learn, Airflow, Redshift, Tableau
            - Projects include sentiment analysis, network analysis, sepsis detection, Bayesian risk modeling, churn prediction
            - Skills: Python, SQL, Java, JavaScript, ML, Big Data, Graph Analytics, Visualization, Cloud technologies
            - Location: Kent, OH
            - Contact: aakashkunarapu17@gmail.com, +1 330-281-0912

            Please provide a helpful, accurate response about Aakash's qualifications and experience.`
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}. Details: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (!apiKey) {
      setShowSettings(true);
      toast({
        title: "API Key Required",
        description: "Please configure your Gemini API key to use the chatbot.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await generateResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Failed to get answer: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your input and try again.`,
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
      handleSendMessage();
    }
  };

  // Settings Panel
  if (showSettings) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 w-96 max-w-[90vw] relative shadow-xl">
          <Button
            onClick={() => setShowSettings(false)}
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 z-10"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Configure Gemini API</h3>
              <p className="text-sm text-muted-foreground">
                Get your free API key from{' '}
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Google AI Studio
                </a>
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Paste your Gemini API key here"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
              />
              
              <div className="flex gap-3">
                <Button 
                  onClick={saveApiKey} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Save API Key
                </Button>
                <Button 
                  onClick={() => setShowSettings(false)} 
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              Your API key is stored locally and never shared.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Button */}
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

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-50 flex flex-col shadow-2xl border-0 bg-white">
          {/* Header */}
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
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4" />
                </Button>
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
          </div>

          {/* Messages Area */}
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
                    <p className="text-sm leading-relaxed">{message.text}</p>
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
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
                onClick={handleSendMessage}
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
