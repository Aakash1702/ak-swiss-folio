
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, ExternalLink, Download } from "lucide-react";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "Job Network Recommender",
      description: "Synthetic LinkedIn data + graph theory + ML to suggest professional intro paths.",
      tech: ["Python", "NetworkX", "PyVis", "Machine Learning"]
    },
    {
      title: "Marvel Universe Network Analysis",
      description: "NetworkX & Gephi to visualize character interactions and compute centrality.",
      tech: ["NetworkX", "Gephi", "Graph Theory", "Data Visualization"]
    },
    {
      title: "Real-Time Audio Assistant",
      description: "System audio capture (Zoom), speech-to-text, and context-aware response generation.",
      tech: ["Python", "Speech Recognition", "Real-Time Processing"]
    },
    {
      title: "Custom Tailoring Portal",
      description: "React frontend + partner-managed fabric inventory for custom Indian women's wear.",
      tech: ["React", "JavaScript", "Inventory Management"]
    }
  ];

  const skills = {
    "Languages": ["Python", "SQL", "JavaScript"],
    "Frameworks/Tools": ["PySpark", "Azure Databricks", "NetworkX", "Gephi", "Docker", "Kubernetes", "n8n"],
    "Concepts": ["Graph Theory", "Machine Learning", "Data Mining", "Web Scraping", "Real-Time Systems"],
    "Soft Skills": ["Rapid Prototyping", "MVP Mindset", "Product Development"]
  };

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
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
              Computer Science Graduate Student @ Kent State University
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <Avatar className="w-64 h-64 border-4 border-blue-600">
              <AvatarImage src="/placeholder.svg" alt="Aakash Kunarapu" />
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
              data-driven solutions that make an impact.
            </p>
            <p>
              With a foundation in Python and SQL, I blend graph-theoretic network analysis, machine learning, 
              and scalable data pipelines to tackle real-world problems. From app-integrity assurance at Genpact 
              to crafting a job-network recommender system, my work spans both rigorous research and production-ready automation.
            </p>
            <p>
              I'm always exploring new tools—PySpark, Azure Databricks, and web-scraping frameworks—to broaden my impact.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Experience</h2>
          <div className="space-y-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-semibold">App Integrity Assurance Engineer Intern</h3>
                <Badge variant="outline" className="w-fit">Genpact</Badge>
              </div>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li>• Reviewed Facebook Login/Signup integrations (Android, iOS, Web) for Meta compliance</li>
                <li>• Implemented automated testing frameworks for OAuth authentication flows</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                {["Python", "Docker", "Kubernetes", "OAuth", "Git", "Jira"].map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-semibold">Research Project: Customer Churn Analysis</h3>
                <Badge variant="outline" className="w-fit">Kent State University</Badge>
              </div>
              <p className="text-gray-600 mb-4">
                Master's course in Probabilistic Data Management focusing on predictive modeling and data analysis
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "Machine Learning", "Statistical Analysis", "Data Mining"].map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Kent State University</h3>
              <p className="text-blue-600 font-medium mb-4">M.S. in Computer Science</p>
              <p className="text-gray-600 mb-4">Current</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Key Courses:</strong></p>
                <p>Advanced Databases, Machine Learning, Graph Theory, Big Data Analytics</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold flex-1">{project.title}</h3>
                  <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" />
                </div>
                <p className="text-gray-600 mb-6">{project.description}</p>
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
          <h2 className="text-3xl md:text-4xl font-light mb-16">Skills</h2>
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

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Contact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:aakash.kunarapu@example.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    aakash.kunarapu@example.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <a href="https://www.linkedin.com/in/aakash-kunarapu/" className="text-gray-600 hover:text-blue-600 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-blue-600" />
                  <a href="https://github.com/aakash-kunarapu" className="text-gray-600 hover:text-blue-600 transition-colors">
                    GitHub Profile
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
            <a href="https://www.linkedin.com/in/aakash-kunarapu/" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/aakash-kunarapu" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
