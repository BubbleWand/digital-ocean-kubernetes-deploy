const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref:"User", required: true },
  content: { type: String, default: "" },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  likes: [{type: Schema.Types.ObjectId, ref:"User"}],
}, { minimize: false })

CommentSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Comment", CommentSchema);