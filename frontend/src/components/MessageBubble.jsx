import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  // If text is an object, render its 'summary' property
  const displayText =
    typeof text === "object" ? text.summary || JSON.stringify(text) : text;

  return <div className={`message-bubble ${isUser ? "user" : "bot"}`}>{displayText}</div>;
};

export default MessageBubble;
