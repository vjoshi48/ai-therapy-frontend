import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = ({ onRegister, onBackToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
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

  const handleQuestion1Change = (event) => {
    setQuestion1(event.target.value);
  };

  const handleQuestion2Change = (event) => {
    setQuestion2(event.target.value);
  };

  const handleQuestion3Change = (event) => {
    setQuestion3(event.target.value);
  };

  const handleQuestion4Change = (event) => {
    setQuestion4(event.target.value);
  };

  const handleQuestion5Change = (event) => {
    setQuestion5(event.target.value);
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
      password.trim() !== '' &&
      question1.trim() !== '' &&
      question2.trim() !== '' &&
      question3.trim() !== '' &&
      question4.trim() !== '' &&
      question5.trim() !== ''
    ) {
      try {
        const response = await fetch('http://127.0.0.1:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            firstName, 
            dateOfBirth, 
            username, 
            password, 
            question1, 
            question2, 
            question3, 
            question4, 
            question5 
          }),
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
        placeholder="YYYY-MM-DD"
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
      <p className="question-text">The questions below will help guide your chatbot to give the best responses.</p>
      <label className="question-text">What would you like to get out of chatting with our chatbots?</label>
      <input
        type="text"
        name="question1"
        placeholder="I would like to..."
        value={question1}
        onChange={handleQuestion1Change}
        className="register-input"
        required
      />
      <label className="question-text">Do you have any preferences with how your chatbots should communicate with you?</label>
      <input
        type="text"
        name="question2"
        placeholder="I prefer that..."
        value={question2}
        onChange={handleQuestion2Change}
        className="register-input"
        required
      />
      <label className="question-text">Do you struggle with any mental or physical health issues that you wish to disclose?</label>
      <input
        type="text"
        name="question3"
        placeholder="I struggle with..."
        value={question3}
        onChange={handleQuestion3Change}
        className="register-input"
        required
      />
      <label className="question-text">Are you a commuter student or do you live on campus?</label>
      <input
        type="text"
        name="question4"
        placeholder="My method of travel is..."
        value={question4}
        onChange={handleQuestion4Change}
        className="register-input"
        required
      />
      <label className="question-text">What is one goal you want to accomplish by using this app?</label>
      <input
        type="text"
        name="question5"
        placeholder="One goal I have is..."
        value={question5}
        onChange={handleQuestion5Change}
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
