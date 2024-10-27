import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResearchAssist.css';
import Header from '../components/Header';


function ResearchAssist() {
  const [arxivLink, setArxivLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleLinkSubmission = () => {
    setSelectedFile(arxivLink);
    setArxivLink("");
  };

  const openSmartAssistant = () => {
    navigate('/smart-assistant');
  };

  return (
    <div className="research-assist-page">
      <Header />
      <div className="link-input">
        <input
          type="text"
          placeholder="Enter arXiv link"
          value={arxivLink}
          onChange={(e) => setArxivLink(e.target.value)}
        />
        <button onClick={handleLinkSubmission}>View Paper</button>
        <button 
          className="smart-assistant-button" 
          onClick={openSmartAssistant} 
          disabled={!selectedFile}
        >
          Smart Assistant
        </button>
      </div>
      
      {selectedFile && (
        <iframe
          src={selectedFile}
          title="Research Paper"
          style={{ width: '100%', height: '90vh', border: 'none' }}
        />
      )}
    </div>
  );
}

export default ResearchAssist;
