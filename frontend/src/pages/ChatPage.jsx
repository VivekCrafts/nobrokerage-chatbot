import React, { useState } from "react";
import axios from "axios";
import ChatBox from "../components/ChatBox";
import PropertyCard from "../components/PropertyCard";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! I’m your Property Search Bot. Ask me things like '2BHK in Pune under ₹80L' or 'Flats in Chembur'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [properties, setProperties] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setProperties([]); // clear old results

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/api/chat`,
        { query: input }
      );

      const botData = res.data.summary || [];
      if (Array.isArray(botData) && botData.length > 0) {
        const summaries = botData.map((item) => item.summary);
        const cards = botData.map((item) => item.property);

        setMessages([
          ...newMessages,
          { sender: "bot", text: summaries.join("\n\n") },
        ]);
        setProperties(cards);
      } else {
        setMessages([
          ...newMessages,
          { sender: "bot", text: "😕 No matching properties found. Try another query!" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Unable to connect to backend. Please try again later." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        🏡 <span className="title">Property Search Bot</span>
      </header>

      <main className="chat-main">
        <ChatBox messages={messages} />

        {properties.length > 0 && (
          <div className="property-results">
            {properties.map((prop, idx) => (
              <PropertyCard key={idx} property={prop} />
            ))}
          </div>
        )}
      </main>

      <footer className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="🔍 Type something like '3BHK in Baner under ₹1Cr'..."
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default ChatPage;
