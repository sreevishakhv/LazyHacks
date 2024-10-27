import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import './SmartAssistant.css';

function SmartAssistant() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioURL = audioBlob ? URL.createObjectURL(audioBlob) : null;

  const handleSubmit = () => {
    if (audioBlob) {
      setResponse("This is a sample response to your recorded question."); // Placeholder response for audio
    } else if (question) {
      setResponse("This is a sample response to your typed question."); // Placeholder response for text
    }
  };

  const handleAudioSubmit = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);

        const audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          setIsRecording(false);
        };
      }).catch((error) => {
        console.error("Microphone access denied or error: ", error);
      });
    }
  };

  const handleClearAudio = () => {
    setAudioBlob(null);
    setQuestion(""); // Reset text input when returning to text input mode
  };

  return (
    <div className="smart-assistant-page">
      <Header />
      <h2>Smart Assistant Summary</h2>
      <div className="summary">
        This is a brief summary of the paper's content. (Placeholder text)
      </div>

      <h3>Ask a Question</h3>
      <div className="question-box">
        {audioBlob ? (
          <div className="audio-playback">
            <audio controls src={audioURL} />
            <button onClick={handleClearAudio} className="close-audio-button">✖</button>
          </div>
        ) : !isRecording ? (
          <textarea
            placeholder="Type your question here or use the mic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        ) : (
          <div className="recording-indicator">Recording... 🔴</div>
        )}
        <div className="question-box-buttons">
          <button onClick={handleAudioSubmit} className={`mic-button ${isRecording ? 'recording' : ''}`}>
            {isRecording ? "Stop Recording" : "🎤 Use Mic"}
          </button>
          <button 
            onClick={handleSubmit} 
            className="send-button" 
            disabled={!question.trim() && !audioBlob}
          >
            Send
          </button>
        </div>
      </div>

      <div className="response-box">
        <h4>Assistant Response</h4>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default SmartAssistant;
