const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref:"User", required: true },
  filename: { type: String, default: "" },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  likedBy: [{type: Schema.Types.ObjectId, ref:"User"}],
  comments: [{ type: Schema.Types.ObjectId, ref:"Comment" }],
}, { minimize: false })

PostSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Poste", PostSchema);