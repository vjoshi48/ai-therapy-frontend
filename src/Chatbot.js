import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = ({ username, onLogout }) => {
  const [messages, setMessages] = useState({});
  const [selectedMode, setSelectedMode] = useState('Therapist');
  const [loading, setLoading] = useState(false);
  const [disableSend, setDisableSend] = useState(false);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const scrollToBottom = () => {
    messageInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const focusMessageInput = () => {
    setTimeout(() => {
      messageInputRef.current.focus();
    }, 100);
  };
  

  const handleSendMessage = (message, mode) => {
    const newMessage = { content: message, sender: 'user' };
    setMessages((prevMessages) => ({
      ...prevMessages,
      [selectedMode]: [...(prevMessages[selectedMode] || []), newMessage],
    }));
    setSelectedMode(mode);
    setLoading(true);
    setDisableSend(true);

    fetch('https://aitherapy-demo-flask-f965355381de.herokuapp.com/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, mode, username }),
    })
      .then((response) => response.json())
      .then((data) => {
        const { message } = data;
        setMessages((prevMessages) => ({
          ...prevMessages,
          [selectedMode]: [
            ...(prevMessages[selectedMode] || []),
            { content: message, sender: selectedMode },
          ],
        }));
        setLoading(false);
        setDisableSend(false);
        focusMessageInput();
        scrollToBottom(); // Scroll to bottom after sending a new message
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
        setDisableSend(false);
      });
  };

  const handleClearChatHistory = () => {
    fetch('https://aitherapy-demo-flask-f965355381de.herokuapp.com/deleteChatHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, selectedMode }), // Include username and mode in the request
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages({}); // Clear the chat messages on screen
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (disableSend) return; // Prevent sending if disabled

    const messageInput = event.target.elements.message;
    const message = messageInput.value.trim();
    const modeSelect = event.target.elements.mode;
    const mode = modeSelect.value;
    if (message) {
      handleSendMessage(message, mode);
      messageInput.value = '';
    }
  };

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  useEffect(() => {
    focusMessageInput();
    scrollToBottom(); // Scroll to bottom on initial render
  }, []);

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages update
  }, [messages]);

  return (
    <div className="chatbot-messages">
      {(messages[selectedMode] || []).map((message, index) => (
        <div key={index} className={message.sender === 'user' ? 'message user' : 'message chatbot'}>
          <strong>{message.sender === 'user' ? 'User:' : selectedMode + ':'}</strong> {message.content}
        </div>
      ))}
      {loading && <div className="message chatbot"><em>Loading</em></div>}
      <div ref={messagesEndRef} />
  <form onSubmit={handleMessageSubmit} className="chatbot-form">
  <div className="input-container">
    <input
      type="text"
      name="message"
      placeholder="Type your message..."
      className="chatbot-input"
      autoComplete="off"
      disabled={disableSend}
      ref={messageInputRef}
    />
    <button type="submit" className="chatbot-button" disabled={disableSend}>
      Send
    </button>
  </div>
  <select
    name="mode"
    className="chatbot-select"
    value={selectedMode}
    onChange={handleModeChange}
    disabled={disableSend}
  >
    <option value="Therapist">Therapist</option>
    <option value="Buddhist Monk">Buddhist Monk</option>
    <option value="Marcus Aurelius">Marcus Aurelius</option>
    <option value="Mark Manson">Mark Manson</option>
  </select>
</form>
      <div className="logout-and-clear-chat-buttons">
      <button onClick={onLogout} className="logout-button">Logout</button> {/* Button to log out */}
      <button onClick={handleClearChatHistory} className="clear-chat-button">Clear History</button> {/* Button to clear chat history */}
      </div>
    </div>
  );
};

export default Chatbot;
