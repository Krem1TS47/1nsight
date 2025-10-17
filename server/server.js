import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// express = handling framework for building backend server and APIs
// mongoose = NoSQL database
// cors = allows frontend to be connected to backend
// bcryptjs = securely hashing passwords
// JWT = used for authentication and session management
// dotenv = loads environment variables from .env file


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const genAI = new GoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const model = genAI.getModel("gemini-1.5-flash");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(5000, () => console.log("server running on port 5000"));



