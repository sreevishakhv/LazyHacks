import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AddTask.css';
import Header from '../components/Header';


function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [difficulty, setDifficulty] = useState('medium');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();

    // Ensure the deadline is a future date
    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set today's time to midnight for accurate comparison

    if (selectedDate <= today) {
      alert("Please select a future date for the task deadline.");
      return;
    }

    const newTask = { taskName, deadline: selectedDate, priority, difficulty };
    setTasks([...tasks, newTask]);

    setTaskName('');
    setDeadline('');
    setPriority('medium');
    setDifficulty('medium');
  };

  // Format today's date to YYYY-MM-DD for the min attribute
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="add-task-page">
      <Header />
      <h2 className="page-title">Add and View Tasks</h2>
      <form className="task-form-fullwidth" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          min={todayDate} // Disable past dates
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy Difficulty</option>
          <option value="medium">Medium Difficulty</option>
          <option value="hard">Hard Difficulty</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="calendar-container">
        <Calendar className="calendar" />
      </div>
    </div>
  );
}

export default AddTask;
