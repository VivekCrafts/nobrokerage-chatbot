import React, { useState } from "react";
import ChatBox from "./ChatBox";
import PropertyCard from "./PropertyCard";
import axios from "axios";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const userMsg = { type: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    // ✅ Use environment variable for backend URL
    const BASE_API = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

    try {
      const res = await axios.post(`${BASE_API}/query`, { query: text });
      const botMsg = { type: "bot", text: res.data.summary, properties: res.data.properties };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error connecting to server:", err);
      const errorMsg = { type: "bot", text: "Error connecting to server." };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.type === "user" ? "text-right mb-2" : "text-left mb-2"}>
            <div
              className={
                msg.type === "user"
                  ? "inline-block bg-blue-100 text-blue-900 px-3 py-2 rounded"
                  : "inline-block bg-gray-100 text-gray-900 px-3 py-2 rounded"
              }
            >
              {msg.text}
            </div>

            {msg.type === "bot" && msg.properties?.length > 0 && (
              <div className="mt-2">
                {msg.properties.map((p, idx) => (
                  <PropertyCard key={idx} property={p} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <ChatBox onSend={sendMessage} />
    </div>
  );
};

export default ChatContainer;
