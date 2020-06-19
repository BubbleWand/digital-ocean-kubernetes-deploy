const conn = require('../data/bubble-db');
const getGfs = require('../utils/getGfs');

module.exports = {
  imgGet: (req, res) => {
    const filename = req.params.imgName;
    const gfs = getGfs(conn)
    gfs.files.findOne({ filename: '27f04678a3e9816c830b47aa2646a7bf.jpg'}, (err, file) => {
      if (!file || file.lenth === 0) {
        return res.status(404).json({
          err: 'file name mismatch/ file not found.'
        })
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    });
  }
}