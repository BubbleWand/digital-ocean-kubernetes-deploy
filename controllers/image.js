const conn = require('../data/bubble-db');
const getGfs = require('../utils/getGfs');

module.exports = {
  imgGet: (req, res) => {
    const filename = req.params.imgName;
    const gfs = getGfs(conn)
    gfs.files.findOne({
      filename
    }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'file name mismatch/ file not found.'
        })
      } else {
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
      }
    });
  },
  imgDeletePost: (req, res) => {
    const filename = req.params.imgName;
    const gfs = getGfs(conn);
    gfs.remove({
      filename,
      root: 'uploads'
    }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({
          err: err
        });
      }
    })
  }
}