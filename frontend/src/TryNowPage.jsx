import React, { useState } from 'react';
import './TryNowPage.css';


function TryNowPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to get prediction');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <div className='try-now-page'>
      
      <form onSubmit={handleSubmit}>
        <h2>Suicide Risk Analyzer</h2>
        <div className="input-group">
          <label htmlFor='text'>Enter Text to Analyze</label>
          <textarea
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type or paste your text here...'
            rows={5}
          />
        </div>
        <button type='submit' disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Analyzing...
              </>
            ) : (
              'Analyze Text'
            )}
          </button>
          
      </form> 
      {error && <div className="error-message">⚠️ {error}</div>}

      {result && (
        <div className="result-card">
          <h3>Analysis Results</h3>
          <div className="result-section">
            <div className="result-row">
              <span className="label">Final Conclusion: </span>
              <span className={`value conclusion ${result.risk_level}`}>
                {result.final_result}
              </span>
            </div>
            
            <div className="result-row">
              <span className="label">Risk Level: </span>
              <span className={`value risk ${result.risk_level}`}>
                {result.risk_level?.toUpperCase()}
              </span>
            </div>

            {/* <div className="result-grid">
              <div className="metric">
                <span className="metric-label">Model Confidence</span>
                <span className="metric-value">
                  {(result.model_confidence * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="metric">
                <span className="metric-label">Sentiment</span>
                <span className={`metric-value sentiment ${result.sentiment_label?.toLowerCase()}`}>
                  {result.sentiment_label}
                </span>
              </div>
            </div> */}

            {/* <div className="detailed-scores">
              <p>Sentiment Confidence: {(result.sentiment_score * 100).toFixed(1)}%</p>
              <p>Suicidal Flag: {result.suicidal ? '⚠️ Detected' : '✅ Not Detected'}</p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default TryNowPage;