import React, { useState } from 'react';
import './intakeform.css';

const RegisterQuestions = ({ username, onSubmit }) => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // You can perform any validation or data processing here
  //   // Then call the onSubmit function with the questions
  //   onSubmit({ question1, question2, question3, question4, question5 });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      username,
      question1,
      question2,
      question3,
      question4,
      question5,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/intakeform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // The request was successful
        // You can handle success here (e.g., show a success message)
        onSubmit({ question1, question2, question3, question4, question5 });
      } else {
        setErrorMessage('An error occurred during submission');
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
      // Handle the error as needed (e.g., show an error message)
    }


  };
  
  const handleBackToChat = async (event) => {
    event.preventDefault();
    onSubmit({ question1, question2, question3, question4, question5 });
  };

  return (
    <div className="register-questions-container">
      <h2 className="register-questions-heading">Intake Form Questions</h2>
      <form onSubmit={handleSubmit} className="register-questions-form">
        <label className="question-label">What would you like to get out of chatting with our chatbots?</label>
        <input
          type="text"
          name="question1"
          placeholder="I would like to..."
          value={question1}
          onChange={handleQuestion1Change}
          className="register-question-input"
          required
        />
        <label className="question-label">Do you have any preferences with how your chatbots should communicate with you?</label>
        <input
          type="text"
          name="question2"
          placeholder="I prefer that..."
          value={question2}
          onChange={handleQuestion2Change}
          className="register-question-input"
          required
        />
        <label className="question-label">Do you struggle with any mental or physical health issues that you wish to disclose?</label>
        <input
          type="text"
          name="question3"
          placeholder="I struggle with..."
          value={question3}
          onChange={handleQuestion3Change}
          className="register-question-input"
          required
        />
        <label className="question-label">Are you a commuter student or do you live on campus?</label>
        <input
          type="text"
          name="question4"
          placeholder="My method of travel is..."
          value={question4}
          onChange={handleQuestion4Change}
          className="register-question-input"
          required
        />
        <label className="question-label">What is one goal you want to accomplish by using this app?</label>
        <input
          type="text"
          name="question5"
          placeholder="One goal I have is..."
          value={question5}
          onChange={handleQuestion5Change}
          className="register-question-input"
          required
        />
        <button type="submit" className="register-questions-button">
          Submit Questions
        </button>
      </form>
      <button onClick={handleBackToChat} className="register-questions-button">
        Back to Chat
      </button>
      {errorMessage && <p className="register-error">{errorMessage}</p>}
    </div>
  );
};

export default RegisterQuestions;
