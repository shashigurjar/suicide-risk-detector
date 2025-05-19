import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2>About This Project</h2>
        <div className="section-divider"></div>
        
        <p className="intro-text">
          This application is a <span className="highlight">Suicide Detection System</span> powered by 
          advanced Machine Learning techniques and modern web technologies.
        </p>

        <div className="info-card">
          <h3>How It Works</h3>
          <ul className="process-list">
            <li>
              <div className="icon-box">➔</div>
              <div className="list-content">
                Text input is analyzed by a Python backend using <span className="tech">TensorFlow</span> and <span className="tech">FastAPI</span>
              </div>
            </li>
            <li>
              <div className="icon-box">➔</div>
              <div className="list-content">
                Pre-trained model (<code>model.h5</code>) processes text with specialized NLP techniques
              </div>
            </li>
            <li>
              <div className="icon-box">➔</div>
              <div className="list-content">
                Advanced algorithms detect potential indicators of distress
              </div>
            </li>
          </ul>
        </div>

        <div className="tech-stack">
          <h3>Technologies Used</h3>
          <div className="tech-grid">
            <div className="tech-item frontend">React.js</div>
            <div className="tech-item backend">FastAPI</div>
            <div className="tech-item ml">TensorFlow</div>
            <div className="tech-item data">NLP Processing</div>
          </div>
        </div>

        <div className="disclaimer-card">
          <div className="warning-icon">⚠️</div>
          <p>
            This application is for educational purposes only and 
            <strong> not a substitute for professional help</strong>. 
            If you're in crisis, please contact a mental health professional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;