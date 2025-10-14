import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import projectRoutes from "./routes/projectroutes.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);
app.use("/api/project", projectRoutes);
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
