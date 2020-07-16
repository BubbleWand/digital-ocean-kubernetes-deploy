const mongoose = require("mongoose");

const url = process.env.MONGODB_URI

mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);

module.exports = mongoose.connection;