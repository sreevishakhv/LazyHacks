import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddTask from './pages/AddTask';
import OptimalPlan from './pages/OptimalPlan'; // Update here
import NotesUpload from './components/NotesUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/optimal-plan" element={<OptimalPlan />} /> {/* Rename here */}
        <Route path="/upload-notes" element={<NotesUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
