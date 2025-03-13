const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Post", postSchema);;
