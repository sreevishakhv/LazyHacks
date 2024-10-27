// AddTask.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AddTask.css';

function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [difficulty, setDifficulty] = useState('medium');
  const [tasks, setTasks] = useState([]);
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [isDayView, setIsDayView] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();

    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      alert("Please select a future date for the task deadline.");
      return;
    }

    const interval = difficulty === 'hard' ? 1 : difficulty === 'medium' ? 2 : 3;
    const newTasks = [];
    let currentDate = new Date(today);

    while (currentDate <= selectedDate) {
      newTasks.push({
        id: Date.now() + currentDate.getTime(), // Unique ID based on time
        taskName,
        deadline: new Date(currentDate),
        priority,
        difficulty,
        completed: false,
      });
      currentDate.setDate(currentDate.getDate() + interval);
    }

    setTasks([...tasks, ...newTasks]);
    setTaskName('');
    setDeadline('');
    setPriority('medium');
    setDifficulty('medium');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setSelectedDateTasks(selectedDateTasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    setSelectedDateTasks(selectedDateTasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const showDayTasks = (date) => {
    const tasksForSelectedDate = tasks.filter(task => task.deadline.toDateString() === date.toDateString());
    setSelectedDateTasks(tasksForSelectedDate);
    setSelectedDate(date);
    setIsDayView(true);
  };

  const tileContent = ({ date }) => {
    const dayTasks = tasks.filter(
      (task) => task.deadline.toDateString() === date.toDateString()
    );

    return (
      <ul className="task-list">
        {dayTasks.map((task) => (
          <li key={task.id} className={`task-${task.priority}`}>
            <span className="task-indicator">{task.taskName}</span>
          </li>
        ))}
      </ul>
    );
  };

  const getSpendTime = (priority) => {
    if (priority === 'high') return 'SPEND: 3hrs';
    if (priority === 'medium') return 'SPEND: 1hr';
    return 'SPEND: 30mins';
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="schedule-assist-page">
      <h2 className="page-title">Schedule Assist</h2>

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
          min={todayDate}
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

      {!isDayView ? (
        <div className="calendar-container">
          <Calendar
            tileContent={tileContent}
            onClickDay={(date) => showDayTasks(date)}
            className="calendar"
          />
        </div>
      ) : (
        <div className="day-view">
          <h3>Tasks for {selectedDate.toDateString()}</h3>
          <div className="task-sheet">
            {selectedDateTasks.map((task) => (
              <div key={task.id} className={`task-details ${task.completed ? 'task-completed' : `task-${task.priority}`}`}>
                <h4>{task.taskName}</h4>
                <p><strong>Priority:</strong> {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                <p><strong>Difficulty:</strong> {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}</p>
                <p><strong>Deadline:</strong> {task.deadline.toDateString()}</p>
                <p><strong>{getSpendTime(task.priority)}</strong></p>
                <button className="toggle-task" onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button className="delete-task" onClick={() => deleteTask(task.id)}>Delete Task</button>
              </div>
            ))}
          </div>
          <button onClick={() => setIsDayView(false)}>Back to Calendar</button>
        </div>
      )}
    </div>
  );
}

export default AddTask;
