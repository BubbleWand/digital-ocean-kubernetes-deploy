const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  points: { type: Number, default: 0},
  profilePhoto: { type: String },
  settings: {
    notifications: {
      imageTag: { type: Boolean, default: true },
      eventInvite: { type: Boolean, default: true },
      friendRequest: { type: Boolean, default: true },
      messages: { type: Boolean, default: true },
      eventUpdate: { type: Boolean, default: true },
    },
    theme: { type: Number, default: 1 },
    privacy: {
      showBubbles: { type: Boolean, default: true },
      showPhotots: { type: Boolean, default: true },
      showEvents: { type: Boolean, default: true },
    },
  },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  bio: { type: String, default: "" },
  bubbles: [{
    id: { type: Schema.Types.ObjectId, ref:"Bubble" },
    bubbleUp: { type: Boolean, default: false },
  }],
  events: [{
    id: { type: Schema.Types.ObjectId, ref:"Bubble" },
    going: { type: Number },
  }],
  friends: [ {
    id: { type: Schema.Types.ObjectId, ref: "User"},
    since: { type: Date}
  }],
  bubblesFollowing: [{ type: Schema.Types.ObjectId, ref: "Bubble"}],
  posts: [{ type: Schema.Types.ObjectId, ref:"Post" }],
}, { minimize: false });


// storing: loc: { type: "Point", coordinates: [ longitude, latitude ] },

UserSchema.index({ location: "2dsphere" });
// Must use function here! ES6 => functions do not bind this!
UserSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
  next();
});

// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch); // return for asynchronous stuff
  });
};

module.exports = mongoose.model("User", UserSchema);