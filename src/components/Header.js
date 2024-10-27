import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header">
      <button onClick={() => navigate('/')} className="home-button">
        Home
      </button>
    </div>
  );
}

export default Header;
