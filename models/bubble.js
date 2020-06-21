const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BubbleSchema = new Schema({
  name: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref:"User" },
  createdAt: { type: Date },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  private: { type: Boolean, default: false },
  about: { type: String, default: "" },
  members: [{ type: Schema.Types.ObjectId, ref:"User" }],
  events: [{ type: Schema.Types.ObjectId, ref:"Event" }],
  points: { type: Number, defualt: 0 },
  tags: [ { type: String }],
  mods: [ {
    id: { type: Schema.Types.ObjectId, ref:"User" },
    permissions: {
      delEvent: { type: Boolean, default: true },
      kickPeople: { type: Boolean, default: true },
      changeAbout: { type: Boolean, default: true },
      deleteChatMessage: { type: Boolean, default: true },
    },
  }],
  photo: { type: String, default: "" },
  wallPhoto: { type: String, default: "" },
}, { minimize: false });

BubbleSchema.index({ location: "2dsphere" });

BubbleSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Bubble", BubbleSchema);