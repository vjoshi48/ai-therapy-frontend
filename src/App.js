import React, { useState } from 'react';
import Chatbot from './Chatbot';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import IntakeForm from './intakeform'; // Import the IntakeForm component
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [registerPageVisible, setRegisterPageVisible] = useState(false);
  const [intakeFormVisible, setIntakeFormVisible] = useState(false); // Track IntakeForm visibility

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setIntakeFormVisible(false); // Hide IntakeForm when logged out
  };

  const handleRegister = () => {
    setRegisterPageVisible(true);
  };

  const handleBackToLogin = () => {
    setRegisterPageVisible(false);
  };

  const handleNavigateToIntakeForm = () => {
    setIntakeFormVisible(true);
  };

  const onSubmitIntakeForm = () => {
    setIntakeFormVisible(false);
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <>
          <h1 className="app-heading">Emotional Support Bots</h1>
          {intakeFormVisible ? (
            <IntakeForm username={username} onSubmit={onSubmitIntakeForm}/> // Show IntakeForm when intakeFormVisible is true
          ) : (
            <Chatbot
              username={username}
              onLogout={handleLogout}
              onNavigateToIntakeForm={handleNavigateToIntakeForm} // Pass callback to Chatbot
            />
          )}
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
