const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref:"User" },
  createdAt: { type: Date },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  startTime: { type: Date },
  endTime: { type: Date },
  private: { type: Boolean, default: false },
  about: { type: String, default: "" },
  tags: [{ type: String }],
  members: [{ 
    id: {type: Schema.Types.ObjectId, ref:"User"},
    status: { type: Boolean, default: true },
  }],
  points: { type: Number, defualt: 0 },
  mods: [ {
    id: { type: Schema.Types.ObjectId, ref:"User" },
    permissions: {
      delEvent: { type: Boolean, default: true },
      kickPeople: { type: Boolean, default: true },
      changeAbout: { type: Boolean, default: true },
      deleteChatMessage: { type: Boolean, default: true },
      deleteImage: { type: Boolean, default: true },
    },
  }],
  photo: { type: String, default: "" },
  wallPhoto: { type: String, default: "" },
  posts: { type: Schema.Types.ObjectId, ref:"Post" },
}, { minimize: false });

BubbleSchema.index({ location: "2dsphere" });

EventSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("Event", EventSchema);