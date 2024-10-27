import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Study Tracker</h1>
        <p>Your personal assistant for managing study tasks, tracking deadlines, and organizing notes.</p>
      </header>

      <div className="home-buttons">
        <button className="home-button" onClick={() => navigate('/add-task')}>
          Add a Task
        </button>
        <button className="home-button" onClick={() => navigate('/optimal-plan')}>
          Optimal Plan
        </button>
        <button className="home-button" onClick={() => navigate('/upload-notes')}>
          Upload Notes
        </button>
      </div>

      <section className="home-features">
        <div className="feature">
          <h2>Efficient Task Management</h2>
          <p>Plan and prioritize your tasks to make the most out of your study time.</p>
        </div>
        <div className="feature">
          <h2>Optimal Scheduling</h2>
          <p>Follow an optimized study plan based on priority and deadlines.</p>
        </div>
        <div className="feature">
          <h2>Organize Notes</h2>
          <p>Upload and store notes for quick access and easy review.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
