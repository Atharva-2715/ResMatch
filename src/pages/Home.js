import React, { useEffect } from 'react';
import './Home.css';
import Navbar from '../components/Home/navbar';
import Hero from '../components/Home/hero';
import AboutMe from '../components/Home/aboutMe';
import ContactMe from '../components/Home/contactMe';



const Home = () => {

    useEffect(() => {
        const sections = document.querySelectorAll('section');
    
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('show');
              }
            });
          },
          { threshold: 0.2 }
        );
    
        sections.forEach(section => {
          observer.observe(section);
        });
    
        return () => observer.disconnect();
      }, []);

      
    return (
        <div className="home">
        <Navbar />
      
        <section className="section fade-in" id="home">
          <Hero />
        </section>
      
        <section  className="section slide-left" id="about">
          <AboutMe />
        </section>
      
        <section className="section zoom-in" id="contact" >
          <ContactMe />
        </section>
      </div>
      
    );
  };
  
  
export default Home;