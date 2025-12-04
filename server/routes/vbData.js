const express = require("express");
const VolleyballData = require("../models/VolleyballData");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// All volleyball data routes require authentication
router.use(authenticateToken);

// Get volleyball stats for the authenticated user
router.get("/", async (req, res) => {
    try {
        const data = await VolleyballData.findOne({ userId: req.user.userId });

        if (!data) {
            // Return default values if no data exists yet
            return res.json({
                serving: 0,
                passing: 0,
                setting: 0,
                spiking: 0,
                blocking: 0,
                digging: 0
            });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching volleyball data:", error);
        res.status(500).json({ error: "Failed to fetch volleyball data" });
    }
});

// Create or update volleyball stats for the authenticated user
router.post("/", async (req, res) => {
    try {
        const { serving, passing, setting, spiking, blocking, digging } = req.body;

        // Validate that all values are within range
        const values = { serving, passing, setting, spiking, blocking, digging };
        for (const [key, value] of Object.entries(values)) {
            if (value < 0 || value > 150) {
                return res.status(400).json({
                    error: `${key} must be between 0 and 150`
                });
            }
        }

        // Use findOneAndUpdate with upsert to create or update
        const data = await VolleyballData.findOneAndUpdate(
            { userId: req.user.userId },
            {
                userId: req.user.userId,
                serving,
                passing,
                setting,
                spiking,
                blocking,
                digging
            },
            {
                new: true, // Return the updated document
                upsert: true, // Create if doesn't exist
                runValidators: true // Run schema validators
            }
        );

        res.json({
            message: "Volleyball data saved successfully",
            data
        });
    } catch (error) {
        console.error("Error saving volleyball data:", error);
        res.status(500).json({ error: "Failed to save volleyball data" });
    }
});

// Update specific stat for the authenticated user
router.patch("/", async (req, res) => {
    try {
        const updates = req.body;

        // Validate updates
        const allowedFields = ['serving', 'passing', 'setting', 'spiking', 'blocking', 'digging'];
        const updateFields = {};

        for (const [key, value] of Object.entries(updates)) {
            if (!allowedFields.includes(key)) {
                return res.status(400).json({ error: `Invalid field: ${key}` });
            }
            if (value < 0 || value > 150) {
                return res.status(400).json({ error: `${key} must be between 0 and 150` });
            }
            updateFields[key] = value;
        }

        const data = await VolleyballData.findOneAndUpdate(
            { userId: req.user.userId },
            updateFields,
            { new: true, upsert: true, runValidators: true }
        );

        res.json({
            message: "Volleyball data updated successfully",
            data
        });
    } catch (error) {
        console.error("Error updating volleyball data:", error);
        res.status(500).json({ error: "Failed to update volleyball data" });
    }
});

// Delete volleyball stats for the authenticated user
router.delete("/", async (req, res) => {
    try {
        const result = await VolleyballData.findOneAndDelete({ userId: req.user.userId });

        if (!result) {
            return res.status(404).json({ error: "No volleyball data found" });
        }

        res.json({ message: "Volleyball data deleted successfully" });
    } catch (error) {
        console.error("Error deleting volleyball data:", error);
        res.status(500).json({ error: "Failed to delete volleyball data" });
    }
});

module.exports = router;
