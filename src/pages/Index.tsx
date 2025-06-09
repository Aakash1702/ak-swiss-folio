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
    <div className="min-h-screen relative overflow-hidden">
      {/* Glass Background with Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 glass-gradient-bg rounded-full blur-3xl animate-glass-float"
          style={{
            left: '10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-80 h-80 glass-gradient-bg rounded-full blur-3xl animate-glass-float"
          style={{
            right: '10%',
            bottom: '20%',
            animationDelay: '4s',
          }}
        />
        <div 
          className="absolute w-64 h-64 glass-gradient-bg rounded-full blur-3xl animate-glass-float"
          style={{
            left: '60%',
            top: '50%',
            animationDelay: '8s',
          }}
        />
      </div>

      {/* Glass Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 apple-transition ${
        isScrolled ? 'glass-nav backdrop-blur-glass-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold glass-text apple-hover cursor-pointer">AK</div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Experience', 'Projects', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="glass-text hover:glass-text apple-transition relative group apple-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 apple-transition group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Glass Effects */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden relative">
        <div className="w-full max-w-6xl mx-auto relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards] glass-text relative z-30">
                  <span className="block glass-text font-semibold">Aakash</span>
                  <span className="block font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-[gradientShift_4s_ease_infinite]">
                    Kunarapu
                  </span>
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl glass-text-muted max-w-2xl transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards] hover:glass-text apple-transition relative z-30">
                  M.S. Computer Science Grad @ Kent State University
                </p>
                <p className="text-lg md:text-xl glass-text-muted max-w-xl leading-relaxed transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards] hover:glass-text apple-transition relative z-30">
                  Data Scientist & ML Engineer architecting high-throughput pipelines and predictive models that transform raw data into strategic insights
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 glass-text-muted transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards] relative z-30">
                <div className="flex items-center space-x-2 hover:glass-text apple-transition apple-hover cursor-pointer">
                  <MapPin className="w-5 h-5 animate-bounce" />
                  <span className="text-lg">Kent, OH</span>
                </div>
                <div className="flex items-center space-x-2 hover:glass-text apple-transition apple-hover cursor-pointer">
                  <Phone className="w-5 h-5 animate-pulse" />
                  <span className="text-lg">+1 330-281-0912</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards] relative z-30">
                <Button 
                  size="lg"
                  className="glass-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white apple-transition apple-hover text-lg px-8 py-4 animate-glass-glow border-0"
                  onClick={handleDownloadResume}
                >
                  <Download className="w-5 h-5 mr-2 animate-bounce" />
                  Download Resume
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="glass-button border-2 border-blue-600/50 glass-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white apple-transition apple-hover text-lg px-8 py-4"
                  onClick={() => window.open('mailto:aakashkunarapu17@gmail.com')}
                >
                  <Mail className="w-5 h-5 mr-2 animate-pulse" />
                  Contact Me
                </Button>
              </div>
              
              <div className="flex space-x-6 transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards] relative z-30">
                <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="glass-text-muted hover:glass-text apple-transition apple-hover animate-float">
                  <Linkedin className="w-7 h-7" />
                </a>
                <a href="#" className="glass-text-muted hover:glass-text apple-transition apple-hover animate-float" style={{ animationDelay: '1s' }}>
                  <Github className="w-7 h-7" />
                </a>
                <a href="mailto:aakashkunarapu17@gmail.com" className="glass-text-muted hover:glass-text apple-transition apple-hover animate-float" style={{ animationDelay: '2s' }}>
                  <Mail className="w-7 h-7" />
                </a>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="transform translate-y-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards] relative z-30">
                <div className="absolute inset-0 glass-gradient-bg rounded-full blur-2xl opacity-60 animate-pulse scale-110"></div>
                <Avatar className="w-80 h-80 lg:w-96 lg:h-96 glass-surface p-1 apple-hover apple-transition animate-glass-float relative z-10">
                  <div className="w-full h-full bg-white/10 rounded-full p-1 backdrop-blur-sm">
                    <AvatarImage src="/lovable-uploads/63457843-c51b-4e97-a03e-9927d5c4f2d2.png" alt="Aakash Kunarapu" className="rounded-full" />
                    <AvatarFallback className="text-6xl font-semibold glass-surface glass-text rounded-full">AK</AvatarFallback>
                  </div>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Glass Theme */}
      <section 
        id="about" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-4xl mx-auto apple-transition ${
          visibleSections.has('about') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-12 glass-text">About</h2>
          <div className="text-lg leading-relaxed space-y-6 glass-text-muted">
            <div className="glass-card p-8 apple-hover apple-transition">
              <p className="hover:glass-text apple-transition">
                I'm <strong className="glass-text animate-pulse">Aakash Kunarapu</strong>, M.S. Computer Science Grad (Kent State University) and Data Scientist/ML Engineer who architects high-throughput data pipelines powering real-time compliance dashboards processing 5M+ events daily. I build predictive models that cut manual review effort by 25% and boost user success metrics by 12%. My work spans ensemble algorithms for early event detection in healthcare, sentiment mining of customer feedback, and graph-based community analysis at scale. I specialize in delivering production-grade AI systems that transform raw data into strategic insights and measurable business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section with Glass Cards */}
      <section 
        id="experience" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-6xl mx-auto apple-transition delay-200 ${
          visibleSections.has('experience') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 glass-text">Work Experience</h2>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index} className="glass-card p-8 apple-hover apple-transition group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold glass-text group-hover:text-blue-400 apple-transition">{job.title}</h3>
                    <p className="text-blue-400 font-medium group-hover:animate-pulse">{job.company}</p>
                  </div>
                  <Badge className="glass-badge w-fit mt-2 md:mt-0 group-hover:scale-110 apple-transition">{job.period}</Badge>
                </div>
                <ul className="glass-text-muted space-y-3 mb-6">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="leading-relaxed hover:glass-text apple-transition hover:pl-4 hover:border-l-4 hover:border-blue-400/50 p-2 rounded">• {achievement}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <Badge key={tech} className="glass-badge hover:scale-110 apple-hover apple-transition cursor-pointer">{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section with Glass Theme */}
      <section 
        className="py-24 px-6 relative"
        data-animate
        id="education"
      >
        <div className={`max-w-6xl mx-auto apple-transition delay-300 ${
          visibleSections.has('education') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 glass-text">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 apple-hover apple-transition group">
              <h3 className="text-xl font-semibold mb-2 glass-text group-hover:text-blue-400 apple-transition">Kent State University, OH</h3>
              <p className="text-blue-400 font-medium mb-4 group-hover:animate-pulse">M.S. in Computer Science</p>
              <p className="glass-text-muted mb-4 group-hover:glass-text apple-transition">Expected: May 2025</p>
              <div className="space-y-1 text-sm glass-text-muted">
                <p><strong>Key Courses:</strong></p>
                <p className="hover:glass-text apple-transition apple-hover">Advanced Databases, Machine Learning, Graph Theory, Big Data Analytics</p>
              </div>
            </div>
            <div className="glass-card p-8 apple-hover apple-transition group">
              <h3 className="text-xl font-semibold mb-2 glass-text group-hover:text-purple-400 apple-transition">Kakatiya University, Warangal, TG</h3>
              <p className="text-purple-400 font-medium mb-4 group-hover:animate-pulse">B.C.A. in Computer Applications</p>
              <p className="glass-text-muted mb-4 group-hover:glass-text apple-transition">May 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Glass Cards */}
      <section 
        id="projects" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-6xl mx-auto apple-transition delay-400 ${
          visibleSections.has('projects') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 glass-text">Project Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="glass-card p-8 apple-hover apple-transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold glass-text group-hover:text-green-400 apple-transition">{project.title}</h3>
                    {project.subtitle && (
                      <p className="text-sm text-blue-400 font-medium mt-1 group-hover:animate-pulse">{project.subtitle}</p>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 glass-text-muted hover:text-green-400 apple-transition cursor-pointer apple-hover" />
                </div>
                <p className="glass-text-muted mb-6 leading-relaxed hover:glass-text apple-transition">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} className="glass-badge hover:scale-110 apple-hover apple-transition cursor-pointer">{tech}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with Glass Theme */}
      <section 
        className="py-24 px-6 relative"
        data-animate
        id="skills"
      >
        <div className={`max-w-6xl mx-auto apple-transition delay-500 ${
          visibleSections.has('skills') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 glass-text">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category} className={`glass-card p-6 apple-hover apple-transition ${
                visibleSections.has('skills') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${categoryIndex * 0.1}s` }}>
                <h3 className="text-lg font-semibold mb-4 glass-text hover:text-blue-400 apple-transition cursor-default">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <Badge 
                      key={skill} 
                      className="glass-badge hover:scale-125 apple-hover apple-transition cursor-pointer animate-glass-float"
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

      {/* Certifications with Glass Cards */}
      <section 
        className="py-24 px-6 relative"
        data-animate
        id="certifications"
      >
        <div className={`max-w-6xl mx-auto apple-transition delay-600 ${
          visibleSections.has('certifications') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 glass-text">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="glass-card p-6 apple-hover apple-transition group">
                <p className="font-medium glass-text group-hover:text-yellow-400 apple-transition">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Glass Form */}
      <section 
        id="contact" 
        className="py-24 px-6 relative"
        data-animate
      >
        <div className={`max-w-4xl mx-auto apple-transition delay-700 ${
          visibleSections.has('contact') 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-light mb-16 glass-text">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 glass-text hover:text-blue-400 apple-transition">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group hover:transform hover:translate-x-4 apple-transition glass-card p-3 cursor-pointer">
                  <Mail className="w-5 h-5 text-blue-400 group-hover:scale-150 group-hover:animate-bounce apple-transition" />
                  <a href="mailto:aakashkunarapu17@gmail.com" className="glass-text-muted hover:glass-text apple-transition">
                    aakashkunarapu17@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 group hover:transform hover:translate-x-4 apple-transition glass-card p-3 cursor-pointer">
                  <Phone className="w-5 h-5 text-blue-400 group-hover:scale-150 group-hover:animate-bounce apple-transition" />
                  <a href="tel:+13302810912" className="glass-text-muted hover:glass-text apple-transition">
                    +1 330-281-0912
                  </a>
                </div>
                <div className="flex items-center space-x-3 group hover:transform hover:translate-x-4 apple-transition glass-card p-3 cursor-pointer">
                  <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-150 group-hover:animate-bounce apple-transition" />
                  <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="glass-text-muted hover:glass-text apple-transition">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="glass-card p-8 apple-hover apple-transition">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name" 
                    className="glass-input border-0 apple-transition" 
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
                    className="glass-input border-0 apple-transition" 
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
                    className="glass-input border-0 apple-transition resize-none" 
                    required
                  />
                </div>
                <Button type="submit" className="w-full glass-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 apple-transition apple-hover text-white border-0 animate-glass-glow">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <GeminiChatBot />

      {/* Glass Footer */}
      <footer className="py-12 px-6 glass-surface border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="glass-text-muted text-sm hover:glass-text apple-transition apple-hover">© 2025 Aakash Kunarapu. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="glass-text-muted hover:glass-text apple-transition apple-hover animate-glass-float">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="glass-text-muted hover:glass-text apple-transition apple-hover animate-glass-float" style={{ animationDelay: '1s' }}>
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
