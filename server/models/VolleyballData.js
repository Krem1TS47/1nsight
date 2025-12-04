const mongoose = require("mongoose");

const volleyballDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // Each user has one set of stats
    },
    serving: { type: Number, required: true, min: 0, max: 150, default: 0 },
    passing: { type: Number, required: true, min: 0, max: 150, default: 0 },
    setting: { type: Number, required: true, min: 0, max: 150, default: 0 },
    spiking: { type: Number, required: true, min: 0, max: 150, default: 0 },
    blocking: { type: Number, required: true, min: 0, max: 150, default: 0 },
    digging: { type: Number, required: true, min: 0, max: 150, default: 0 }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Index for faster queries by userId
volleyballDataSchema.index({ userId: 1 });

module.exports = mongoose.model("VolleyballData", volleyballDataSchema);
