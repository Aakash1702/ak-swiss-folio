
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin,
  Code2,
  Database,
  Brain,
  ChevronDown,
  Star,
  Calendar,
  Building,
  Award,
  Sparkles
} from 'lucide-react';
import GeminiChatBot from '@/components/GeminiChatBot';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const experiences = [
    {
      title: "Data Scientist / Platform Compliance Analyst",
      company: "Genpact (Meta Platforms)",
      period: "Jan 2023 – Jul 2023",
      location: "Remote",
      achievements: [
        "Developed ML models for content moderation achieving 94% accuracy",
        "Built automated data pipelines processing 10M+ records daily",
        "Created real-time dashboards reducing manual reporting by 80%",
        "Collaborated with cross-functional teams to optimize platform safety"
      ],
      tech: ["Python", "SQL", "PySpark", "scikit-learn", "Airflow", "Redshift", "Tableau"]
    }
  ];

  const projects = [
    {
      title: "Advanced Sentiment Analysis Platform",
      description: "Real-time sentiment analysis system with 92% accuracy using deep learning",
      tech: ["Python", "TensorFlow", "NLP", "React", "Docker"],
      features: ["Real-time processing", "Multi-language support", "Scalable architecture"],
      impact: "Processed 1M+ social media posts daily"
    },
    {
      title: "Network Analytics Engine",
      description: "Graph-based analytics platform for social network analysis",
      tech: ["Neo4j", "Python", "NetworkX", "D3.js", "FastAPI"],
      features: ["Community detection", "Influence scoring", "Interactive visualization"],
      impact: "Analyzed networks with 100K+ nodes"
    },
    {
      title: "Sepsis Early Detection System",
      description: "ML-powered healthcare system for early sepsis detection",
      tech: ["Python", "Random Forest", "XGBoost", "Flask", "PostgreSQL"],
      features: ["Real-time monitoring", "Risk stratification", "Clinical integration"],
      impact: "Achieved 89% sensitivity in clinical trials"
    },
    {
      title: "Bayesian Risk Modeling Suite",
      description: "Comprehensive risk assessment platform using Bayesian methods",
      tech: ["R", "Stan", "Shiny", "PostgreSQL", "Docker"],
      features: ["Monte Carlo simulation", "Uncertainty quantification", "Interactive dashboards"],
      impact: "Reduced prediction uncertainty by 35%"
    }
  ];

  const skills = {
    "Programming": ["Python", "SQL", "Java", "JavaScript", "R", "Scala"],
    "Machine Learning": ["scikit-learn", "TensorFlow", "PyTorch", "XGBoost", "Keras"],
    "Big Data": ["PySpark", "Hadoop", "Kafka", "Airflow", "Databricks"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis", "Neo4j", "Snowflake"],
    "Cloud & DevOps": ["AWS", "GCP", "Docker", "Kubernetes", "Jenkins"],
    "Visualization": ["Tableau", "Power BI", "D3.js", "Plotly", "Matplotlib"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 ring-2 ring-blue-100">
                <AvatarImage src="/lovable-uploads/63457843-c51b-4e97-a03e-9927d5c4f2d2.png" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold">AK</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Aakash Kunarapu
                </h1>
                <p className="text-sm text-slate-600">Data Scientist & ML Engineer</p>
              </div>
            </div>
            
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {['about', 'experience', 'projects', 'skills'].map((section) => (
                  <NavigationMenuItem key={section}>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} transition-all duration-300 hover:bg-slate-100 hover:scale-105 ${
                        activeSection === section ? 'bg-blue-50 text-blue-700 font-medium' : ''
                      }`}
                      onClick={() => scrollToSection(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              onClick={() => window.open('/lovable-uploads/Aakash_Kunarapu_DS.pdf', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                  <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-700">Available for Opportunities</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                    Transforming Data into
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Intelligent Solutions
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Data Scientist and ML Engineer passionate about leveraging advanced analytics 
                  and machine learning to solve complex business challenges and drive innovation.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection('projects')}
                >
                  <Star className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection('about')}
                >
                  Learn More
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center text-slate-600">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-medium">Kent, OH</span>
                </div>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="hover:bg-slate-100 hover:scale-110 transition-all duration-300">
                    <Mail className="w-5 h-5 text-slate-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-slate-100 hover:scale-110 transition-all duration-300">
                    <Linkedin className="w-5 h-5 text-slate-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-slate-100 hover:scale-110 transition-all duration-300">
                    <Github className="w-5 h-5 text-slate-600" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="w-80 h-80 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-700 rounded-full opacity-30 animate-pulse delay-300"></div>
                  <Avatar className="w-72 h-72 mx-auto mt-4 ring-4 ring-white shadow-2xl">
                    <AvatarImage 
                      src="/lovable-uploads/63457843-c51b-4e97-a03e-9927d5c4f2d2.png" 
                      className="object-cover"
                    />
                    <AvatarFallback className="text-6xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      AK
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-300 rounded-full opacity-60 animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-r from-slate-50 to-blue-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Pursuing M.S. in Computer Science at Kent State University with a passion for 
              transforming complex data into actionable insights through advanced machine learning techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="p-8 border-0 shadow-xl bg-white/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Education</h3>
                    <p className="text-slate-600">Academic Excellence</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-slate-900">M.S. Computer Science</h4>
                    <p className="text-slate-700">Kent State University</p>
                    <p className="text-sm text-slate-600">Expected: May 2025</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-0 shadow-xl bg-white/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Expertise</h3>
                    <p className="text-slate-600">Core Competencies</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Machine Learning", "Data Engineering", "Deep Learning", "MLOps"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="justify-center py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 transition-all duration-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl font-bold mb-4">Professional Impact</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">10M+</div>
                    <div className="text-blue-100">Records Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">94%</div>
                    <div className="text-blue-100">Model Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">80%</div>
                    <div className="text-blue-100">Efficiency Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">1M+</div>
                    <div className="text-blue-100">Daily Predictions</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-slate-900">aakashkunarapu17@gmail.com</p>
                  <p className="text-sm text-slate-600">Let's connect and collaborate</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
                <Phone className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-slate-900">+1 330-281-0912</p>
                  <p className="text-sm text-slate-600">Available for discussions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Delivering impactful data solutions at scale with cutting-edge technology
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-8 border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.title}</h3>
                        <p className="text-lg font-semibold text-blue-600 mb-2">{exp.company}</p>
                        <div className="flex items-center text-slate-600 mb-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Achievements</h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <Star className="w-4 h-4 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-slate-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Innovative solutions combining machine learning, data engineering, and scalable architecture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="p-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                    <span className="text-xs font-medium text-green-700">Impact: {project.impact}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-slate-300 hover:bg-slate-50 transition-colors duration-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive skill set spanning the entire data science and machine learning pipeline
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card key={category} className="p-8 border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    {category === "Programming" && <Code2 className="w-6 h-6 text-white" />}
                    {category === "Machine Learning" && <Brain className="w-6 h-6 text-white" />}
                    {category === "Big Data" && <Database className="w-6 h-6 text-white" />}
                    {category === "Databases" && <Database className="w-6 h-6 text-white" />}
                    {category === "Cloud & DevOps" && <Code2 className="w-6 h-6 text-white" />}
                    {category === "Visualization" && <Star className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{category}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {skillList.map((skill) => (
                    <Badge key={skill} variant="secondary" className="justify-center py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-300 cursor-pointer">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Ready to leverage data science and machine learning to solve your toughest challenges? 
            Let's connect and explore possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open('mailto:aakashkunarapu17@gmail.com')}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => window.open('/lovable-uploads/Aakash_Kunarapu_DS.pdf', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Avatar className="w-10 h-10 ring-2 ring-slate-700">
                <AvatarImage src="/lovable-uploads/63457843-c51b-4e97-a03e-9927d5c4f2d2.png" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">AK</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Aakash Kunarapu</p>
                <p className="text-sm text-slate-400">Data Scientist & ML Engineer</p>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Mail className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <Separator className="my-8 bg-slate-700" />
          
          <div className="text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Aakash Kunarapu. Crafted with passion for data science.</p>
          </div>
        </div>
      </footer>

      <GeminiChatBot />
    </div>
  );
};

export default Index;
