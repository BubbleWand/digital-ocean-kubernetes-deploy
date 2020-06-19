const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BubbleSchema = new Schema({})

module.exports = mongoose.model("Bubble", BubbleSchema);