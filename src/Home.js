// Home.js

import React, { useState } from 'react';
import AddTask from './pages/AddTask';
import OptimalPlan from './pages/OptimalPlan';
import LearningAssist from './pages/LearningAssist';
import './Home.css';

function Home() {
  const [activeTab, setActiveTab] = useState('Add Task');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Add Task':
        return <AddTask />;
      case 'Optimal Plan':
        return <OptimalPlan />;
      case 'Learning Assistant':
        return <LearningAssist />;
      default:
        return null;
    }
  };

  const goToHome = () => {
    setActiveTab('Add Task');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 onClick={goToHome} className="clickable-title">Study Tracker</h1>
        <button onClick={() => setActiveTab('Learning Assistant')}>Learning Assistant</button>
      </header>

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Home;
    