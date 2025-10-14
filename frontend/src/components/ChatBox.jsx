import React from "react";
import MessageBubble from "./MessageBubble";

const ChatBox = ({ messages }) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "15px",
        width: "80%",
        margin: "0 auto",
        maxHeight: "70vh",
        overflowY: "auto",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {messages.map((msg, i) => (
        <MessageBubble key={i} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
};

export default ChatBox;
