import React, { useState } from 'react';
import './LoginPage.css';
import RegisterPage from './RegisterPage';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      try {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const { username: responseUsername, password: responsePassword } = await response.json();
        if (responseUsername === 'incorrect') {
          setErrorMessage('Username not found');
        } else if (responsePassword === 'incorrect') {
          setErrorMessage('Incorrect password');
        } else {
          onLogin(responseUsername);
        }
      } catch (error) {
        console.error('Error occurred during login:', error);
        setErrorMessage('An error occurred during login');
      }
    }
  };

  const handleShowRegisterPage = () => {
    setShowRegisterPage(true);
  };

  const handleBackToLogin = () => {
    setShowRegisterPage(false);
  };

  if (showRegisterPage) {
    return <RegisterPage onRegister={handleShowRegisterPage} onBackToLogin={handleBackToLogin} />;
  }

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {errorMessage && <p className="login-error">{errorMessage}</p>}
      <button className="register-button" onClick={handleShowRegisterPage}>
        Register
      </button>
    </div>
  );
};

export default LoginPage;