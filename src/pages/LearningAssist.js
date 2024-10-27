// LearningAssist.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningAssist.css';

function LearningAssist() {
  const [currentTab, setCurrentTab] = useState('Research Assistant');
  const [arxivLink, setArxivLink] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null); // Added state for video file
  const [notes, setNotes] = useState(null);
  const navigate = useNavigate();

  const handleLinkSubmission = () => {
    setSelectedFile(arxivLink);
    setArxivLink('');
  };

  const handleFileUpload = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleVideoUpload = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const navigateToSmartAssistant = () => {
    if (pdfFile) {
      navigate('/smart-assistant', { state: { uploadedFile: pdfFile.name } });
    } else if (selectedFile) {
      navigate('/smart-assistant', { state: { uploadedFile: selectedFile } });
    }
  };

  const handleGenerateNotes = () => {
    setNotes(`
      <h3>CSE340 Class: Lambda Calculus and Evaluation Strategies</h3>
      <strong>Instructor:</strong> Rida Bazzi<br>
      <strong>Source:</strong> Class Lecture<br><br>
      ---
      <h3>Background</h3>
      <p>The lecture covers key concepts in lambda calculus, focusing on variable capture in beta reduction and evaluation strategies. Topics include distinguishing between free and bound variables and ensuring correct substitution to avoid errors during beta reduction. Key principles like normal forms and unique evaluation results are also discussed.</p>
      ---
      <h3>Key Concepts and Definitions</h3>
      <ol>
        <li><strong>Beta Reduction and Variable Capture:</strong> 
          <p>Beta reduction allows functions to apply arguments but can lead to variable capture if a free variable becomes bound incorrectly. Solutions involve renaming or adjusting to maintain the variable’s correct binding.</p>
        </li>
        <li><strong>Redexes (Reducible Expressions):</strong> 
          <p>A redex is a part of an expression ready for reduction. Redexes can be nested or outermost, with "leftmost outermost" redexes typically reduced first to reach a normal form effectively.</p>
        </li>
        <li><strong>Normal Forms:</strong> 
          <p>A term is in normal form if it cannot be further reduced. According to Church-Rosser Theorem, if a term has a normal form, it is unique regardless of reduction path, ensuring evaluation consistency.</p>
        </li>
        <li><strong>Evaluation Strategies:</strong> 
          <p>The lecture contrasts <em>Normal Order</em> (leftmost, outermost reduction) with <em>Call by Value</em> (evaluating arguments before applying the function). "Call by value" demands that arguments be fully evaluated, while "Normal Order" can handle partially evaluated expressions.</p>
        </li>
      </ol>
      ---
      <h3>Examples and Illustrations</h3>
      <ul>
        <li><strong>Examples of Redexes:</strong> Demonstrations included nested vs. outermost redexes and how these influence reduction order in both Normal Order and Call by Value.</li>
        <li><strong>Unique Normal Form:</strong> An example showed multiple reduction paths leading to the same final form, illustrating the Church-Rosser Theorem.</li>
        <li><strong>Factorial and Sum Calculations:</strong> Iterative examples used pairs to represent states in recursive functions, demonstrating the use of lambda calculus for iterative processes.</li>
      </ul>
      ---
      <h3>Advanced Topics</h3>
      <ul>
        <li><strong>Curried Functions:</strong> Functions of multiple variables can be represented in lambda calculus by returning functions for each successive argument, known as "currying."</li>
        <li><strong>Higher-Order Functions:</strong> These functions, which return other functions, allow partial application of arguments and are common in functional languages.</li>
        <li><strong>Iterative State Representation:</strong> The lecture explained the iterative calculation of factorials and summing squares by representing states as pairs, which evolve with each iteration.</li>
      </ul>
      ---
      <h3>Conclusion</h3>
      <p>The lecture highlighted fundamental concepts in lambda calculus and their relevance in computation theory, setting the foundation for advanced programming techniques. The unique evaluation of lambda expressions and higher-order functions illustrate the versatility and consistency of lambda calculus in computation. Understanding these foundational principles supports broader applications in programming language design and functional programming.</p>
    `);
  };

  const renderContent = () => {
    if (currentTab === 'Research Assistant') {
      return (
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
            onClick={navigateToSmartAssistant}
            disabled={!selectedFile}
          >
            Smart Assistant
          </button>
          {selectedFile && (
            <iframe
              src={selectedFile}
              title="Research Paper"
              style={{ width: '100%', height: '90vh', border: 'none' }}
            />
          )}
        </div>
      );
    } else if (currentTab === 'Personal Tutor') {
      return (
        <div className="tutor-section">
          <input type="file" onChange={handleFileUpload} />
          <button
            onClick={navigateToSmartAssistant}
            disabled={!pdfFile}
          >
            Smart Assistant
          </button>
        </div>
      );
    } else if (currentTab === 'Video to Note Maker') {
      return (
        <div className="video-note-section">
          <p>Upload a video to generate notes.</p>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          <button onClick={handleGenerateNotes} disabled={!videoFile}>Generate Notes</button>
          {notes && (
            <div className="summary" dangerouslySetInnerHTML={{ __html: notes }}></div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="learning-assist-page">
      <div className="tab-buttons">
        <button onClick={() => setCurrentTab('Personal Tutor')}>Personal Tutor</button>
        <button onClick={() => setCurrentTab('Research Assistant')}>Research Assistant</button>
        <button onClick={() => setCurrentTab('Video to Note Maker')}>Video to Note Maker</button>
      </div>
      {renderContent()}
    </div>
  );
}

export default LearningAssist;
