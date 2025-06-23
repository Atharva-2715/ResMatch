import "./hero.css";

const hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-title">
        <h1>Match Better.</h1>
        <h1>Apply Smarter.</h1>
      </div>

      <div className="hero-description">
        <p>
          Tired of guessing if your resume fits the job? Let AI do the hard
          work. Upload your resume and a job description — get a match score,
          smart tips, and instant feedback to level up your chances. No fluff,
          just results.
        </p>
      </div>

      <div className="hero-button">
<button type="button" class="glow-on-hover">
  Get Started
</button>
      </div>
    </section>
  );
};

export default hero;
