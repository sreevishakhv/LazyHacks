import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import './UploadNotes.css';

function UploadNotes() {
  const [folders, setFolders] = useState([
    { name: 'Math', files: ['file1.pdf', 'file2.pdf'], subfolders: [] },
    { name: 'Science', files: ['file3.pdf'], subfolders: [] }
  ]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const menuRef = useRef(null);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
        setShowActionMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { name: newFolderName, files: [], subfolders: [] }]);
      setNewFolderName('');
    }
  };

  const handleSelectFolder = (folder) => {
    setCurrentFolder(folder);
  };

  const toggleActionMenu = () => {
    setShowActionMenu(!showActionMenu);
  };

  return (
    <div className="upload-notes-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Folders</h3>
          <span className="add-icon" onClick={toggleActionMenu}>+</span>
          {showActionMenu && (
            <div className="action-menu" ref={menuRef}>
              <input
                type="text"
                placeholder="New Folder Name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <button onClick={handleAddFolder}>Add Folder</button>
            </div>
          )}
        </div>
        <ul className="folder-list">
          {folders.map((folder, index) => (
            <li key={index} className="folder-header" onClick={() => handleSelectFolder(folder)}>
              {folder.name}
              <span className="menu-icon" onClick={() => setShowMenu(folder.name)}>⋮</span>
              {showMenu === folder.name && (
                <div className="dropdown-menu" ref={menuRef}>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              )}
              <ul className="file-list">
                {folder.files.map((file, idx) => (
                  <li key={idx} className="file-item">
                    {file}
                    <span className="menu-icon">⋮</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
      <Header />
        {currentFolder ? (
          <>
            <h3>{currentFolder.name} Notes</h3>
            <p>Select options in the sidebar to manage files and folders.</p>
          </>
        ) : (
          <p>Select a folder from the sidebar to view its contents.</p>
        )}
      </div>
    </div>
  );
}

export default UploadNotes;
