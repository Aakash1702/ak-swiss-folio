
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, ExternalLink, Download, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GeminiChatBot from "@/components/GeminiChatBot";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/Aakash_Kunarapu_DS.pdf';
    link.download = 'Aakash_Kunarapu_DS_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:aakashkunarapu17@gmail.com?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    setFormData({ name: '', email: '', message: '' });
    toast({
      title: "Success",
      description: "Your email client has been opened with the message. Please send the email to complete your message.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const workExperience = [
    {
      title: "Data Scientist",
      company: "Genpact, Hyderabad, India",
      period: "Jun 2022 – Jul 2023",
      achievements: [
        "Trained gradient-boosted-tree risk model with 25 engineered signals achieving 0.87 F1-score, capturing 78% of high-risk cases and cutting manual review hours 25%",
        "Designed daily ETL workflows (PySpark + Redshift) in Airflow, delivering sub-hourly audit-ready tables to BI tools",
        "Re-wrote complex joins and window functions, slashing dashboard refresh latency 60% and reducing cloud costs by $4K/month",
        "Audited 400+ product integrations across 9 regions, mining telemetry logs to surface UX and compliance gaps",
        "Launched company-wide Tableau analytics layer for Product, Legal, and Engineering teams",
        "Led workshops with 120 external dev teams; model-guided remediation boosted first-login success 12% MoM"
      ],
      tech: ["Python", "scikit-learn", "PySpark", "Redshift", "Airflow", "Tableau", "MLflow", "Docker", "AWS ECS"]
    },
    {
      title: "Data Science Intern",
      company: "Genpact, Hyderabad, India", 
      period: "Jan 2022 – May 2022",
      achievements: [
        "Queried and cleaned 75K daily event records (PostgreSQL + Pandas) to uncover data-quality defects and user-journey drop-offs",
        "Prototyped 25-feature store (time-series drift, error frequency, behavioral entropy) that powered production scoring model",
        "Built interactive Tableau dashboard reducing triage lead-time from 3 days to 1 day",
        "Authored PostgreSQL window-function queries for weekly retention cohorts; exposed 14% user drop-off in APAC region",
        "Added Pandas/Pydantic checks to ETL prototype, cutting null-pointer exceptions 30% and raising pipeline reliability to 99.7%",
        "Built parameterized SQL harness for authentication edge cases, reducing validation cycles from 1 day to 10 minutes"
      ],
      tech: ["PostgreSQL", "Pandas", "Tableau", "Pydantic", "SQL", "Python", "Data Analysis"]
    }
  ];

  const projects = [
    {
      title: "Skytrax Reviews Analysis",
      subtitle: "British Airways Virtual Internship",
      description: "Analyzed ~3,940 reviews with VADER sentiment analysis; uncovered 56% positive vs. 41% negative trends. Extracted themes (cabin crew service, premium economy) and recommended satisfaction improvements.",
      tech: ["Python", "VADER", "Sentiment Analysis", "Data Analysis"]
    },
    {
      title: "Marvel Universe Network Analysis",
      description: "NetworkX analysis of 6,000+ characters & 160,000 interactions; computed centrality and detected communities via Girvan–Newman. Built interactive Plotly & Matplotlib visuals to convey findings.",
      tech: ["NetworkX", "Plotly", "Matplotlib", "Graph Theory", "Community Detection"]
    },
    {
      title: "Sepsis Detection Ensemble",
      description: "Developed LSTM-GBM stacking pipeline on 40,000+ ICU records; validated via AUC-ROC & F1-score.",
      tech: ["LSTM", "Gradient Boosting", "TensorFlow", "Healthcare Analytics"]
    },
    {
      title: "Bayesian Grid Risk Forecasting",
      description: "Monte Carlo & Bayesian network models for grid stability; delivered stakeholder dashboards.",
      tech: ["Bayesian Networks", "Monte Carlo", "Risk Analysis", "Dashboard Development"]
    },
    {
      title: "Customer Churn Prediction",
      description: "Random Forest model achieving 93% accuracy; applied SHAP for feature interpretation to drive production insights.",
      tech: ["Random Forest", "SHAP", "Feature Engineering", "Production ML"]
    }
  ];

  const skills = {
    "Languages": ["Python", "SQL", "Java", "JavaScript"],
    "Big Data": ["PySpark", "Apache Spark", "Data Pipelines", "Redshift", "MongoDB"],
    "ML & Statistics": ["scikit-learn", "TensorFlow", "NLP (VADER)", "Hypothesis Testing", "PCA"],
    "Graph Analytics": ["NetworkX", "Gephi", "Connectivity Analysis"],
    "Visualization": ["Tableau", "Plotly", "Matplotlib", "Power BI"],
    "Dev & Deployment": ["Docker", "Kubernetes", "Airflow", "Git", "CI/CD"],
    "Cloud & SaaS": ["AWS", "GCP", "Supabase", "Okta", "Slack"],
    "Practices": ["Agile", "OOP", "Feature Engineering", "Operational Monitoring"]
  };

  const certifications = [
    "Python for Data Science & Machine Learning Essential Training",
    "British Airways Data Science Job Simulation",
    "Big Data Analytics with Hadoop & Apache Spark",
    "Introduction to Prompt Engineering for Generative AI"
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-2xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-foreground">AK</div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 relative">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground">
                  <span className="block font-semibold transform transition-all duration-700 hover:scale-105">Aakash</span>
                  <span className="block font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                    Kunarapu
                  </span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  M.S. Computer Science Grad @ Kent State University
                </p>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Data Scientist & ML Engineer architecting high-throughput pipelines and predictive models that transform raw data into strategic insights
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Kent, OH</span>
                </div>
                <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                  <span className="text-lg">+1 330-281-0912</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                  onClick={handleDownloadResume}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-2 border-blue-600/50 text-lg px-8 py-4 hover:bg-blue-600/10 transform transition-all duration-300 hover:scale-105 hover:border-blue-600"
                  onClick={() => window.open('mailto:aakashkunarapu17@gmail.com')}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </Button>
              </div>
              
              <div className="flex space-x-6 animate-fade-in" style={{ animationDelay: '1s' }}>
                <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                  <Linkedin className="w-7 h-7" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                  <Github className="w-7 h-7" />
                </a>
                <a href="mailto:aakashkunarapu17@gmail.com" className="text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                  <Mail className="w-7 h-7" />
                </a>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Avatar className="w-80 h-80 lg:w-96 lg:h-96 ring-4 ring-gradient-to-r from-blue-600 to-purple-600 ring-offset-4 ring-offset-background transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                <AvatarImage src="/lovable-uploads/63457843-c51b-4e97-a03e-9927d5c4f2d2.png" alt="Aakash Kunarapu" />
                <AvatarFallback className="text-6xl font-semibold">AK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${
          visibleSections.has('about') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-foreground">About</h2>
          <div className="text-lg leading-relaxed space-y-6 text-muted-foreground">
            <Card className="p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-blue-500/20">
              <p>
                I'm <strong className="text-foreground bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Aakash Kunarapu</strong>, M.S. Computer Science Grad (Kent State University) and Data Scientist/ML Engineer who architects high-throughput data pipelines powering real-time compliance dashboards processing 5M+ events daily. I build predictive models that cut manual review effort by 25% and boost user success metrics by 12%. My work spans ensemble algorithms for early event detection in healthcare, sentiment mining of customer feedback, and graph-based community analysis at scale. I specialize in delivering production-grade AI systems that transform raw data into strategic insights and measurable business growth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section 
        id="experience" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-200 ${
          visibleSections.has('experience') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-foreground">Work Experience</h2>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card key={index} className="p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-purple-500/20" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <Badge className="w-fit mt-2 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition-transform duration-300">{job.period}</Badge>
                </div>
                <ul className="text-muted-foreground space-y-3 mb-6">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="leading-relaxed hover:text-foreground transition-colors duration-300">• {achievement}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="hover:scale-105 hover:bg-blue-500/20 transition-all duration-300">{tech}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section 
        className="py-24 px-6 relative"
        data-animate
        id="education"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-300 ${
          visibleSections.has('education') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-foreground">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-blue-500/20">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Kent State University, OH</h3>
              <p className="text-blue-600 font-medium mb-4">M.S. in Computer Science</p>
              <p className="text-muted-foreground mb-4">Expected: May 2025</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p><strong>Key Courses:</strong></p>
                <p>Advanced Databases, Machine Learning, Graph Theory, Big Data Analytics</p>
              </div>
            </Card>
            <Card className="p-8 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-purple-500/20">
              <h3 className="text-xl font-semibold mb-2 text-foreground">Kakatiya University, Warangal, TG</h3>
              <p className="text-purple-600 font-medium mb-4">B.C.A. in Computer Applications</p>
              <p className="text-muted-foreground mb-4">May 2022</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-400 ${
          visibleSections.has('projects') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-foreground">Project Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="p-8 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 bg-gradient-to-br from-card to-card/50 border-2 hover:border-pink-500/20 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
                    {project.subtitle && (
                      <p className="text-sm text-blue-600 font-medium mt-1">{project.subtitle}</p>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer transform group-hover:scale-125 group-hover:rotate-12" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="hover:scale-105 hover:bg-pink-500/20 transition-all duration-300">{tech}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        className="py-24 px-6 relative"
        data-animate
        id="skills"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-500 ${
          visibleSections.has('skills') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-foreground">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <Card key={category} className={`p-6 transition-all duration-700 hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-2 hover:rotate-1 bg-gradient-to-br from-card to-card/50 border-2 hover:border-blue-500/20 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${categoryIndex * 0.1}s` }}>
                <h3 className="text-lg font-semibold mb-4 text-foreground bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300">{skill}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section 
        className="py-24 px-6 relative"
        data-animate
        id="certifications"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-600 ${
          visibleSections.has('certifications') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-foreground">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card to-card/50 border-2 hover:border-green-500/20" style={{ animationDelay: `${index * 0.1}s` }}>
                <p className="font-medium text-foreground hover:text-green-600 transition-colors duration-300">{cert}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-700 ${
          visibleSections.has('contact') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-foreground">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:aakashkunarapu17@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    aakashkunarapu17@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+13302810912" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    +1 330-281-0912
                  </a>
                </div>
                <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
            <Card className="p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-2 hover:border-blue-500/20">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                    required
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email" 
                    required
                    className="transition-all duration-300 focus:scale-105"
                  />
                </div>
                <div>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message" 
                    rows={4} 
                    className="resize-none transition-all duration-300 focus:scale-105" 
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <GeminiChatBot />

      {/* Footer */}
      <footer className="py-12 px-6 border-t relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Aakash Kunarapu. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-all duration-300 transform hover:scale-125 hover:rotate-12">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
