const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
require('dotenv').config();

const url = process.env.MONGODB_URI
const conn = mongoose.createConnection(url);

module.exports = conn;