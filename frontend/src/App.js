import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage.jsx";
import ProjectDetails from "./pages/ProjectDetails";
import TestProjectLinks from "./pages/testpageslink.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/project/:slug" element={<ProjectDetails />} />
        <Route path="/test-links" element={<TestProjectLinks />} />
      </Routes>
    </Router>
  );
}

export default App;
