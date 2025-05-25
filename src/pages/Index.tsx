import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, ExternalLink, Download, Phone, MapPin } from "lucide-react";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">AK</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#experience" className="text-gray-600 hover:text-blue-600 transition-colors relative group">
                Experience
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors relative group">
                Projects
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-6 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
              Aakash<br />
              <span className="font-semibold">Kunarapu</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl">
              M.S. Computer Science candidate @ Kent State University
            </p>
            <div className="flex items-center space-x-6 mb-8 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Kent, OH</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 330-281-0912</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                onClick={() => window.open('mailto:aakashkunarapu17@gmail.com')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <Avatar className="w-64 h-64 border-4 border-blue-600">
              <AvatarImage src="/lovable-uploads/4b7a1308-cb9c-4428-8335-ba961480ac6f.png" alt="Aakash Kunarapu" />
              <AvatarFallback className="text-4xl font-semibold bg-blue-50 text-blue-600">AK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12">About</h2>
          <div className="text-lg leading-relaxed space-y-6 text-gray-700">
            <p>
              I'm a Computer Science graduate student at Kent State University, passionate about building 
              data-driven solutions that impact real-world operations. With expertise in Python, SQL, and PySpark, 
              I develop scalable pipelines, risk-scoring models, and network-analysis tools to uncover insights 
              and drive compliance and performance improvements.
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Work Experience</h2>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <Badge variant="outline" className="w-fit mt-2 md:mt-0">{job.period}</Badge>
                </div>
                <ul className="text-gray-600 space-y-3 mb-6">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="leading-relaxed">• {achievement}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Kent State University, OH</h3>
              <p className="text-blue-600 font-medium mb-4">M.S. in Computer Science</p>
              <p className="text-gray-600 mb-4">Expected: May 2025</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Key Courses:</strong></p>
                <p>Advanced Databases, Machine Learning, Graph Theory, Big Data Analytics</p>
              </div>
            </Card>
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Kakatiya University, Warangal, TG</h3>
              <p className="text-blue-600 font-medium mb-4">B.C.A. in Computer Applications</p>
              <p className="text-gray-600 mb-4">May 2022</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Project Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {project.subtitle && (
                      <p className="text-sm text-blue-600 font-medium mt-1">{project.subtitle}</p>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" />
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill} className="bg-blue-50 text-blue-700 hover:bg-blue-100">
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
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                <p className="font-medium text-gray-800">{cert}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:aakashkunarapu17@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    aakashkunarapu17@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+13302810912" className="text-gray-600 hover:text-blue-600 transition-colors">
                    +1 330-281-0912
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-gray-600 hover:text-blue-600 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
            <Card className="p-8 bg-white">
              <form className="space-y-6">
                <div>
                  <Input placeholder="Your Name" className="border-gray-200 focus:border-blue-600" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" className="border-gray-200 focus:border-blue-600" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" rows={4} className="border-gray-200 focus:border-blue-600" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2025 Aakash Kunarapu. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/in/aakash-kunarapu-80a55424b/" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
