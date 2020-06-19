const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

module.exports = (conn) => {
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
  return gfs;
}