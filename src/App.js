import React, { useState } from 'react';
import Chatbot from './Chatbot';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [registerPageVisible, setRegisterPageVisible] = useState(false);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  const handleRegister = () => {
    setRegisterPageVisible(true);
  };

  const handleBackToLogin = () => {
    setRegisterPageVisible(false);
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <>
          <h1 className="app-heading">Emotional Support Bots</h1>
          <Chatbot username={username} onLogout={handleLogout} />
        </>
      ) : (
        <>
          <h1 className="app-heading">Welcome</h1>
          <LoginPage onLogin={handleLogin} />
          {registerPageVisible && (
            <RegisterPage onRegister={handleRegister} onBackToLogin={handleBackToLogin} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
