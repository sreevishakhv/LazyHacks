import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddTask from './pages/AddTask';
import OptimalPlan from './pages/OptimalPlan';
import ResearchAssist from './pages/LearningAssist';
import SmartAssistant from './pages/SmartAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/optimal-plan" element={<OptimalPlan />} />
        <Route path="/research-assist" element={<ResearchAssist />} />
        <Route path="/smart-assistant" element={<SmartAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;
