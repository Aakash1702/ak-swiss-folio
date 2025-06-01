import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, ExternalLink, Download, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
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
    link.href = '/lovable-uploads/Aakash_Kunarapu.pdf';
    link.download = 'Aakash_Kunarapu_Resume.pdf';
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

    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:aakashkunarapu17@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Clear form and show success message
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
      title: "Data Scientist / Platform Compliance Analyst",
      company: "Genpact (Meta Platforms)",
      period: "Jan 2023 – Jul 2023",
      achievements: [
        "Audited Facebook Login and Account Kit integrations for 400+ apps, parsing OAuth logs and SDK telemetry with Python/SQL to surface infringements and map regional trends",
        "Designed a gradient-boosted risk-scoring model (scikit-learn) using 25 features; top-20 list caught 78% of violations and cut manual review hours by 25%",
        "Built PySpark pipelines in Airflow to ingest daily events into Redshift and power Tableau dashboards for near real-time compliance visibility",
        "Guided 120 developer teams through remediation steps, boosting first-time-login success by 12% MoM"
      ],
      tech: ["Python", "SQL", "PySpark", "scikit-learn", "Airflow", "Redshift", "Tableau"]
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
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-200 rounded-full animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x / 10,
            top: mousePosition.y / 10,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"
          style={{
            right: mousePosition.x / 15,
            bottom: mousePosition.y / 15,
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold transform hover:scale-110 transition-transform duration-300 hover:rotate-3">AK</div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Experience', 'Projects', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 relative group transform hover:scale-105 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden relative">
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards] gradient-text">
                  Aakash
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">
                    Kunarapu
                  </span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-2xl transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards] hover:text-blue-600 transition-colors duration-500">
                  M.S. Computer Science Grad @ Kent State University
                </p>
                <p className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards] hover:text-gray-700 transition-colors duration-300">
                  Data Scientist & ML Engineer architecting high-throughput pipelines and predictive models that transform raw data into strategic insights
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-600 transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
                <div className="flex items-center space-x-2 hover:text-blue-600 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <MapPin className="w-5 h-5 animate-bounce" />
                  <span className="text-lg">Kent, OH</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-blue-600 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <Phone className="w-5 h-5 animate-pulse" />
                  <span className="text-lg">+1 330-281-0912</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 text-lg px-8 py-4 animate-glow"
                  onClick={handleDownloadResume}
                >
                  <Download className="w-5 h-5 mr-2 animate-bounce" />
                  Download Resume
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2 text-lg px-8 py-4"
                  onClick={() => window.open('mailto:aakashkunarapu17@gmail.com')}
                >
                  <Mail className="w-5 h-5 mr-2 animate-pulse" />
                  Contact Me
                </Button>
              </div>
              
              <div className="flex space-x-6 transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards]">
                <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-150 hover:rotate-12 animate-float">
                  <Linkedin className="w-7 h-7" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-150 hover:rotate-12 animate-float" style={{ animationDelay: '1s' }}>
                  <Github className="w-7 h-7" />
                </a>
                <a href="mailto:aakashkunarapu17@gmail.com" className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-150 hover:rotate-12 animate-float" style={{ animationDelay: '2s' }}>
                  <Mail className="w-7 h-7" />
                </a>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse scale-110"></div>
                <Avatar className="w-80 h-80 lg:w-96 lg:h-96 border-4 border-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1 hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/50 animate-float relative z-10">
                  <div className="w-full h-full bg-white rounded-full p-1">
                    <AvatarImage src="/lovable-uploads/63457843-c51b-4e97-a03e-9927d5c4f2d2.png" alt="Aakash Kunarapu" className="rounded-full" />
                    <AvatarFallback className="text-6xl font-semibold bg-blue-50 text-blue-600 rounded-full">AK</AvatarFallback>
                  </div>
                </Avatar>
              </div>
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
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          visibleSections.has('about') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-12 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">About</h2>
          <div className="text-lg leading-relaxed space-y-6 text-gray-700">
            <p className="hover:text-gray-900 transition-all duration-300 hover:scale-105 transform hover:-translate-y-1 hover:shadow-lg hover:bg-blue-50 p-4 rounded-lg cursor-default">
              I'm <strong className="text-blue-600 animate-pulse">Aakash Kunarapu</strong>, M.S. Computer Science Grad (Kent State University) and Data Scientist/ML Engineer who architects high-throughput data pipelines powering real-time compliance dashboards processing 5M+ events daily. I build predictive models that cut manual review effort by 25% and boost user success metrics by 12%. My work spans ensemble algorithms for early event detection in healthcare, sentiment mining of customer feedback, and graph-based community analysis at scale. I specialize in delivering production-grade AI systems that transform raw data into strategic insights and measurable business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section 
        id="experience" 
        className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50 relative"
        data-animate
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-200 ${
          visibleSections.has('experience') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">Work Experience</h2>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white group hover:bg-gradient-to-br hover:from-white hover:to-blue-50 transform hover:scale-[1.02] hover:rotate-1 border-0 shadow-lg hover:shadow-blue-500/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-all duration-300 group-hover:scale-105">{job.title}</h3>
                    <p className="text-blue-600 font-medium group-hover:animate-pulse">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="w-fit mt-2 md:mt-0 group-hover:border-blue-600 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce">{job.period}</Badge>
                </div>
                <ul className="text-gray-600 space-y-3 mb-6">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="leading-relaxed hover:text-gray-800 transition-all duration-300 hover:pl-4 hover:border-l-4 hover:border-blue-400 hover:bg-blue-50 p-2 rounded">• {achievement}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:animate-pulse">{tech}</Badge>
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
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
          visibleSections.has('education') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group hover:bg-gradient-to-br hover:from-white hover:to-blue-50 hover:rotate-1 border-0 shadow-lg hover:shadow-blue-500/20">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-105">Kent State University, OH</h3>
              <p className="text-blue-600 font-medium mb-4 group-hover:animate-pulse">M.S. in Computer Science</p>
              <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">Expected: May 2025</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Key Courses:</strong></p>
                <p className="hover:text-gray-800 transition-colors duration-300 hover:scale-105">Advanced Databases, Machine Learning, Graph Theory, Big Data Analytics</p>
              </div>
            </Card>
            <Card className="p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group hover:bg-gradient-to-br hover:from-white hover:to-purple-50 hover:-rotate-1 border-0 shadow-lg hover:shadow-purple-500/20">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-all duration-300 group-hover:scale-105">Kakatiya University, Warangal, TG</h3>
              <p className="text-purple-600 font-medium mb-4 group-hover:animate-pulse">B.C.A. in Computer Applications</p>
              <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">May 2022</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="py-24 px-6 bg-gradient-to-br from-gray-50 to-green-50 relative"
        data-animate
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-400 ${
          visibleSections.has('projects') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">Project Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white group hover:bg-gradient-to-br hover:from-white hover:to-green-50 transform hover:scale-[1.02] hover:rotate-1 border-0 shadow-lg hover:shadow-green-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-green-600 transition-all duration-300 group-hover:scale-105">{project.title}</h3>
                    {project.subtitle && (
                      <p className="text-sm text-blue-600 font-medium mt-1 group-hover:animate-pulse">{project.subtitle}</p>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 hover:text-green-600 transition-all duration-300 cursor-pointer hover:scale-150 hover:rotate-12 group-hover:animate-bounce" />
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed hover:text-gray-800 transition-colors duration-300 group-hover:scale-105">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="hover:bg-green-100 hover:text-green-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:animate-pulse">{tech}</Badge>
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
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-500 ${
          visibleSections.has('skills') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category} className={`transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${categoryIndex * 0.1}s` }}>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 hover:text-blue-600 transition-all duration-300 hover:scale-110 cursor-default">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <Badge 
                      key={skill} 
                      className="bg-blue-50 text-blue-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:rotate-3 animate-float"
                      style={{ animationDelay: `${skillIndex * 0.1}s` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section 
        className="py-24 px-6 bg-gradient-to-br from-gray-50 to-yellow-50 relative"
        data-animate
        id="certifications"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-600 ${
          visibleSections.has('certifications') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white hover:bg-gradient-to-br hover:from-white hover:to-yellow-50 group transform hover:scale-[1.02] hover:rotate-1 border-0 shadow-lg hover:shadow-yellow-500/20">
                <p className="font-medium text-gray-800 group-hover:text-yellow-700 transition-all duration-300 group-hover:scale-105">{cert}</p>
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
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-700 ${
          visibleSections.has('contact') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 hover:text-blue-600 transition-colors duration-300">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group hover:transform hover:translate-x-4 transition-all duration-300 hover:bg-blue-50 p-3 rounded-lg cursor-pointer">
                  <Mail className="w-5 h-5 text-blue-600 group-hover:scale-150 group-hover:animate-bounce transition-transform duration-300" />
                  <a href="mailto:aakashkunarapu17@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    aakashkunarapu17@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 group hover:transform hover:translate-x-4 transition-all duration-300 hover:bg-blue-50 p-3 rounded-lg cursor-pointer">
                  <Phone className="w-5 h-5 text-blue-600 group-hover:scale-150 group-hover:animate-bounce transition-transform duration-300" />
                  <a href="tel:+13302810912" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    +1 330-281-0912
                  </a>
                </div>
                <div className="flex items-center space-x-3 group hover:transform hover:translate-x-4 transition-all duration-300 hover:bg-blue-50 p-3 rounded-lg cursor-pointer">
                  <Linkedin className="w-5 h-5 text-blue-600 group-hover:scale-150 group-hover:animate-bounce transition-transform duration-300" />
                  <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
            <Card className="p-8 bg-white hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1 border-0 shadow-lg hover:shadow-blue-500/20">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                    className="border-gray-200 focus:border-blue-600 transition-all duration-300 hover:border-blue-400 hover:scale-105 focus:scale-105" 
                    required
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email" 
                    className="border-gray-200 focus:border-blue-600 transition-all duration-300 hover:border-blue-400 hover:scale-105 focus:scale-105" 
                    required
                  />
                </div>
                <div>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message" 
                    rows={4} 
                    className="border-gray-200 focus:border-blue-600 transition-all duration-300 hover:border-blue-400 hover:scale-105 focus:scale-105" 
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1 animate-glow">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-300 hover:scale-105">© 2025 Aakash Kunarapu. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-150 hover:rotate-12 animate-float">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-150 hover:rotate-12 animate-float" style={{ animationDelay: '1s' }}>
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
