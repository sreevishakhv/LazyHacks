import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './OptimalPlan.css';
import Header from '../components/Header';


function OptimalPlan() {
  const [tasks] = useState([
    { taskName: 'Study Chapter 1', deadline: new Date(2024, 9, 27), priority: 'high', difficulty: 'hard', duration: 3 },
    { taskName: 'Review Notes', deadline: new Date(2024, 9, 28), priority: 'medium', difficulty: 'medium', duration: 2 },
    { taskName: 'Complete Assignment', deadline: new Date(2024, 9, 29), priority: 'low', difficulty: 'easy', duration: 1 },
  ]);

  const generateOptimalPlan = () => {
    const scheduledTasks = tasks.map(task => {
      const sessionMultiplier = task.difficulty === 'hard' ? 1.5 : task.difficulty === 'medium' ? 1 : 0.5;
      const sessions = [];
      const duration = Math.ceil(task.duration * sessionMultiplier);

      for (let i = 0; i < duration; i++) {
        const sessionDate = new Date(task.deadline);
        sessionDate.setDate(sessionDate.getDate() - i);
        sessions.push({ date: sessionDate, taskName: task.taskName, priority: task.priority });
      }
      return sessions;
    }).flat();

    return scheduledTasks;
  };

  const scheduledTasks = generateOptimalPlan();

  const tileContent = ({ date }) => {
    const dayTasks = scheduledTasks.filter(
      (task) => task.date.toDateString() === date.toDateString()
    );

    return (
      <ul className="task-list">
        {dayTasks.map((task, index) => (
          <li key={index} className={`task-${task.priority}`}>
            {task.taskName}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="optimal-plan-page">
      <Header />
      <h2 className="page-title">Optimal Study Plan</h2>
      <p className="page-description">Your tasks are optimally scheduled based on priority, deadline, and difficulty level.</p>

      <div className="calendar-container">
        <Calendar
          tileContent={tileContent}
          className="calendar"
        />
      </div>
    </div>
  );
}

export default OptimalPlan;
