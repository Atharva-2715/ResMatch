import React, { useState, useEffect } from 'react';
import { Upload, FileText, Zap, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import './howItWorks.css';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-cycle through steps
  
  const steps = [
    {
      id: 1,
      icon: Upload,
      title: "Upload Your Resume",
      description: "Simply drag and drop your resume file or browse to upload. We accept PDF and DOC formats.",
      color: "#ff6b6b",
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      id: 2,
      icon: FileText,
      title: "Paste Job Description",
      description: "Copy and paste the job description you're targeting. Our AI will analyze every detail.",
      color: "#4ecdc4",
      gradient: "from-teal-500/20 to-cyan-500/20"
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Get Your Report",
      description: "Receive instant AI-powered insights and actionable tips to improve your resume match score.",
      color: "#ff9f79",
      gradient: "from-blue-500/20 to-purple-500/20"
    }
  ];

  const StepCard = ({ step, index, isActive }) => {
    const Icon = step.icon;
    const parallaxX = (mousePosition.x - 0.5) * (index + 1) * 0.3 * 30;
    const parallaxY = (mousePosition.y - 0.5) * (index + 1) * 0.3 * 30;

    return (
      <div 
        className={`step-card ${isActive ? 'active' : ''}`}
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          animationDelay: `${index * 0.3}s`
        }}
        onMouseEnter={() => setActiveStep(index)}
      >
        <div className="step-number">{step.id}</div>
        <div className="step-icon" style={{ color: step.color }}>
          <Icon size={32} />
        </div>
        <h3 className="step-title">{step.title}</h3>
        <p className="step-description">{step.description}</p>
        <div className="step-arrow">
          <ArrowRight size={20} />
        </div>
        {isActive && <div className="active-indicator" />}
      </div>
    );
  };

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    duration: Math.random() * 2 + 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1
  }));

  const Particle = ({ delay, duration, left, top, size }) => (
    <div 
      className="floating-particle"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  return (
    <section className="how-it-works" id="how-it-works">
      {/* Background particles */}
      {particles.map((particle) => (
        <Particle 
          key={particle.id}
          delay={particle.delay}
          duration={particle.duration}
          left={particle.left}
          top={particle.top}
          size={particle.size}
        />
      ))}

      <div className="how-it-works-container">
        <div className="section-header">
          <h1 className="section-title">How It Works</h1>
          <p className="section-subtitle">
            Three simple steps to <span className="highlight">transform your resume</span>  
             <br></br>and <span className="highlight">maximize your job match potential</span>
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <StepCard 
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
            />
          ))}
        </div>

        <div className="cta-section">
          <div className="result-preview">
            <div className="preview-header">
              <CheckCircle className="check-icon" size={24} />
              <span>Sample Analysis Result</span>
            </div>
            <div className="preview-content">
              <div className="match-score">
                <span className="score-label">Match Score:</span>
                <span className="score-value">87%</span>
              </div>
              <div className="improvements">
                <div className="improvement-item">
                  <Zap size={16} />
                  <span>Add 3 technical skills mentioned in job description</span>
                </div>
                <div className="improvement-item">
                  <Zap size={16} />
                  <span>Include specific metrics and achievements</span>
                </div>
                <div className="improvement-item">
                  <Zap size={16} />
                  <span>Optimize keywords for ATS systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default HowItWorks;