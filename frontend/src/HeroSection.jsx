import React from "react";
import "./HeroSection.css"; 

const HeroSection = (props) => {
      function handleLearn(){
          window.scrollBy({
              top: 700, 
              behavior: 'smooth'
        });
      }
      function handleTryNow(){
         props.change(true);
      }
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Suicide Detection with ML</h1>
        <p className="hero-subtitle">
          An intelligent model trained to detect suicidal thoughts from text input. Empowering mental health awareness through machine learning.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleTryNow}>Try Now ↗</button>
          <button className="btn-secondary" onClick={handleLearn}>Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
