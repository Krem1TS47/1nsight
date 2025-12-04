const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const vbDataRoutes = require("./routes/vbData");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/vbdata", vbDataRoutes);


// Gemini AI Integration
const genAI = new GoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const model = genAI.getModel("gemini-1.5-flash");


app.post("/analyze-stats", async (req, res) => {
    try {
        const {stats} = req.body;

        const prompt = `
        You are an expert volleyball analyst.
        Analyze the following team statistics and write a short performance summary:`
        {JSON.stringify(stats, null, 2)}
        `;`

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.json({ analysis: response});
    } catch (error) {
        console.error("Error analyzing stats:", error);
        res.status(500).json({ error: "Failed to analyze stats" });
    }
})

app.listen(5000, () => console.log("server running on port 5000"));


// Mongoose Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));



