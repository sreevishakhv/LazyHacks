import React, { useState } from 'react';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [importance, setImportance] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, deadline, importance });
    setTitle('');
    setDeadline('');
    setImportance('medium');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <select value={importance} onChange={(e) => setImportance(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
