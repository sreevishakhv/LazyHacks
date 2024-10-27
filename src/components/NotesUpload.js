import React, { useState } from 'react';

function NotesUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Placeholder for backend upload functionality
    console.log('File to upload:', file);
  };

  return (
    <div>
      <h2>Upload Notes</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default NotesUpload;
