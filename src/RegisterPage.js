// RegisterPage.js
import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = ({ onRegister, onBackToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobRegex.test(dateOfBirth)) {
      setErrorMessage('Please enter the date of birth in the format YYYY-MM-DD');
      return;
    }

    if (
      firstName.trim() !== '' &&
      dateOfBirth.trim() !== '' &&
      username.trim() !== '' &&
      password.trim() !== ''
    ) {
      try {
        const response = await fetch('https://aitherapy-demo-flask-f965355381de.herokuapp.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, dateOfBirth, username, password }),
        });
        const { username_taken } = await response.json();
        if (username_taken) {
          setErrorMessage('Username already taken');
        } else {
          setRegistrationSuccess(true);
          window.location.reload(); // Reload the page
        }
      } catch (error) {
        console.error('Error occurred during registration:', error);
        setErrorMessage('An error occurred during registration');
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          value={firstName}
          onChange={handleFirstNameChange}
          className="register-input"
          required
        />
        <input
          type="text"
          name="dateOfBirth"
          placeholder="Enter your date of birth (YYYY-MM-DD)"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          className="register-input"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          className="register-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className="register-input"
          required
        />
        <button type="submit" className="register-button">
          Register
        </button>
        </form>
      {errorMessage && <p className="register-error">{errorMessage}</p>}
      <button className="login-button" onClick={onBackToLogin}>
        Back to Login
      </button>
    </div>
  );
};

export default RegisterPage;
