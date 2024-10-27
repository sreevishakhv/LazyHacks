import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AddTask.css';

function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!taskName || !deadline) {
      alert("Please enter both task name and deadline.");
      return;
    }

    const newTask = { taskName, deadline: new Date(deadline), priority };
    setTasks([...tasks, newTask]);

    setTaskName('');
    setDeadline('');
    setPriority('medium');
  };

  const tileContent = ({ date }) => {
    const dayTasks = tasks.filter(
      (task) => task.deadline.toDateString() === date.toDateString()
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
    <div className="add-task-page">
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
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <div className="calendar-container">
        <Calendar
          tileContent={tileContent}
          className="calendar"
        />
      </div>
    </div>
  );
}

export default AddTask;
