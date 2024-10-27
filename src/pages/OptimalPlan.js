import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './OptimalPlan.css';

function OptimalPlan() {
  const [tasks] = useState([
    { taskName: 'Study Chapter 1', deadline: new Date(2024, 9, 27), priority: 'high', duration: 3 },
    { taskName: 'Review Notes', deadline: new Date(2024, 9, 28), priority: 'medium', duration: 2 },
    { taskName: 'Complete Assignment', deadline: new Date(2024, 9, 29), priority: 'low', duration: 1 },
  ]);

  // Function to generate an optimized plan based on tasks
  const generateOptimalPlan = () => {
    const scheduledTasks = tasks.map(task => {
      const sessions = [];
      for (let i = 0; i < task.duration; i++) {
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
      <h2 className="page-title">Optimal Study Plan</h2>
      <p className="page-description">Your tasks are optimally scheduled based on priority and deadlines.</p>
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
