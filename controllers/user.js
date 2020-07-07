const conn = require('../data/bubble-db');

module.exports = {
  updateSettings: (req, res) => {
    return res.status(200).json(req.body)
  }
}