const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    passingMark: {type: int, required: true, unique: true},
    hittingMark: {type: int, required: true, unique: true},
    servingMark: {type: int, required: true, unique: true},
    blockingMark: {type: int, required: true, unique: true},
    settingMark: {type: int, required: true, unique: true},
    diggingMark: {type: int, required: true, unique: true}

});

module.exports = mongoose.model("VolleyballData", dataSchema);