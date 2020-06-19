const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.MONGODB_URI
// const conn = mongoose.createConnection(url);

// module.exports = conn;

mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);

module.exports = mongoose.connection;