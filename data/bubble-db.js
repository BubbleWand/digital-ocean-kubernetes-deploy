const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
require('dotenv').config();

const url = process.env.MONGODB_URI
const conn = mongoose.createConnection(url);

// mongoose.createConnection(url)
//   .then(conn => {
//     let gfs;
//     conn.once('open', () => {
//       gfs = Grid(conn.db, mongoose.mongo);
//       gfs.collection('uploads')
//     })
//     .then(() => {
//       module.exports = {conn, gfs}
//     })
//   })


// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads')
// })
  


module.exports = conn;