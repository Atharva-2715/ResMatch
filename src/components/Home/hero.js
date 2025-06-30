import React, { useEffect, useState } from "react";
import "./hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate("/login");
  };


  return (
    <section className="hero" id="home">
      

      <div className="hero-title">
        <h1>Match Better.</h1>
        <h1>Apply Smarter.</h1>
      </div>

      <div className="hero-description">
        <p>
          Tired of guessing if your resume fits the job?<span className="highlight"> Let AI do the hard
          work.</span> Upload your resume and a job description — get a match score,
          smart tips, and instant feedback to level up your chances. <span className="highlight">  No fluff,
          just results. </span>
        </p>
      </div>

      <div className="hero-button">
        <button onClick={handleLoginClick} type="button" className="glow-on-hover">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;