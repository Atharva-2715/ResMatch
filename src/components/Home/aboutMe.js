import React, { useState, useEffect } from 'react';
import './aboutMe.css';

const AboutMe = () => {
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

  const CodeLine = ({ children, delay }) => (
    <div className="code-line" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );

  // Generate particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 6,
    duration: Math.random() * 3 + 3,
    left: Math.random() * 100,
    top: Math.random() * 100
  }));

  const shapes = [
    { size: 300, position: { top: '10%', left: '-150px' }, delay: 0 },
    { size: 200, position: { top: '60%', right: '-100px' }, delay: -10 },
    { size: 150, position: { top: '30%', left: '80%' }, delay: -5 }
  ];

  const Particle = ({ delay, duration, left, top }) => (
    <div 
      className="particle"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );

  const Shape = ({ size, position, delay, index }) => {
    const parallaxX = (mousePosition.x - 0.5) * (index + 1) * 0.5 * 50;
    const parallaxY = (mousePosition.y - 0.5) * (index + 1) * 0.5 * 50;

    return (
      <div
        className="floating-shape"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          ...position,
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          animationDelay: `${delay}s`
        }}
      />
    );
  };

  return (
    <section className="about-me" id="about">
      <div className="left-container">
        <div className="about-me-title">
          <h1>About Me</h1>
        </div>
        <div className="description">
          Hey there! I'm a <span className="highlight">third-year Computer Engineering student</span> with a passion for building things that solve real-world problems.
          <br/><br/>
          This project was born out of a simple idea: what if applying for jobs felt less like guesswork and more like <span className="highlight">strategy</span>? So I built a tool that helps job seekers understand how well their resumes align with job descriptions—using a little bit of <span className="highlight">AI and a lot of curiosity</span>.
          <br/><br/>
          I'm always learning, experimenting, and creating. Whether it's web apps, AI projects, or just trying to bring ideas to life—I love the process of <span className="highlight">turning code into something useful</span>.
          <br/><br/>
          This is just the beginning.
        </div>
      </div>
      
      <div className="visual-section">
        {/* Add floating shapes */}

        
        {shapes.map((shape, index) => (
          <Shape 
            key={index}
            size={shape.size}
            position={shape.position}
            delay={shape.delay}
            index={index}
          />
        ))}
        
        {/* Add floating particles */}
        {particles.map((particle) => (
          <Particle 
            key={particle.id}
            delay={particle.delay}
            duration={particle.duration}
            left={particle.left}
            top={particle.top}
          />
        ))}
        
        <div className="code-preview">
          <div className="code-content">
            <CodeLine delay={0.5}>
              <span className="keyword">const</span> passion = <span className="string">"problem-solving"</span>;
            </CodeLine>
            <CodeLine delay={1}>
              <span className="keyword">const</span> tools = [<span className="string">"AI"</span>, <span className="string">"Web Dev"</span>, <span className="string">"Curiosity"</span>];
            </CodeLine>
            <CodeLine delay={1.5}>
              <span className="comment">// Building the future, one project at a time</span>
            </CodeLine>
            <CodeLine delay={2}>
              <span className="keyword">function</span> <span className="string">createSolution</span>() {'{'}
            </CodeLine>
            <CodeLine delay={2.5}>
              &nbsp;&nbsp;<span className="keyword">return</span> passion + tools.<span className="string">join</span>(<span className="string">" + "</span>);
            </CodeLine>
            <CodeLine delay={3}>
              {'}'}
            </CodeLine>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;