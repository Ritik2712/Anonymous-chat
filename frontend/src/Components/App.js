import React, { useRef, useState } from "react";

const Apps = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [sms, setSms] = useState("");
  const input = useRef(null);

  socket.on("message", (message, id) => {
    console.log(messages, "newMessages");
    var newMessage = [...messages];
    newMessage.push(message);
    console.log("new Messages", newMessage);
    setMessages(newMessage);
  });
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("send", sms);
    setSms("");
    input.current.focus();
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <a href="index.html" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">JavaScript</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li>
            <li>Mike</li>
            <li>Mike</li>
            <li>Mike</li>
            <li>Mike</li>
            <li>Mike</li>
            <li>Mike</li>
          </ul>
        </div>
        <div className="chat-messages">
          {messages.map((item, index) => {
            return (
              <div className="message" key={index}>
                <p className="meta">
                  Brad <span>9:12pm</span>
                </p>
                <p className="text">{item}</p>
              </div>
            );
          })}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={sendMessage}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            ref={input}
            value={sms}
            onChange={(e) => {
              console.log(messages);
              setSms(e.target.value);
            }}
            autoComplete="off"
          />
          <button className="btn" onClick={sendMessage}>
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apps;
