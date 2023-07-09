import React, { useState } from 'react';
import Chatbot from './Chatbot';
import LoginPage from './LoginPage';
import './Chatbot.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <>
          <h1 className="app-heading">Emotional Support Bots</h1>
          <Chatbot username={username} onLogout={handleLogout} />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
