import React from 'react';
import './PreventionSection.css';
import noSuicideImage from './sui.jpg'; 

function PreventionSection() {
  return (
    <section className="prevention-section">
      <div className="prevention-content">
      <div className="image-container">
        <img src={noSuicideImage} alt="No Suicide" className="prevention-image" />
      </div>
      <div className="content-container">
        <h2 className="prevention-heading">Preventing Suicide: What You Can Do</h2>
        <ul className="prevention-list">
          <li> ➱ Talk openly and listen without judgment.</li>
          <li> ➱ Encourage professional help – therapist, doctor, or hotline.</li>
          <li> ➱ Stay connected and check in regularly.</li>
          <li> ➱ Be aware of warning signs like isolation, mood swings, or sudden calmness after distress.</li>
          <li> ➱ In case of immediate danger, don’t leave the person alone. Call emergency services.</li>
        </ul>
      </div>
      </div>
    </section>
  );
}

export default PreventionSection;
