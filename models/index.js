const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BubbleSchema = new Schema({
  bubbleTags: [{ type: String }],
  eventTags: [{ type: String }],
  
}, {minimize: true})