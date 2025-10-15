// server.js
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import projectRoutes from "./routes/projectroutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/chat", chatRoutes);
app.use("/api/project", projectRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Use dynamic port for Render, fallback to 5000 for local dev
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
