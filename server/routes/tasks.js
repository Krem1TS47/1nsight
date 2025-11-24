const express = require("express");
const Task = require("../models/Task");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// All task routes require authentication
router.use(authenticateToken);

// Get all tasks for the authenticated user
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.userId });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Create a new task for the authenticated user
router.post("/", async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            userId: req.user.userId
        });
        await task.save();
        res.json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
});

module.exports = router;