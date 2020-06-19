const jwt = require('jsonwebtoken')
const User = require('../models/users');
const conn = require('../data/bubble-db');
const getGfs = require('../utils/getGfs');

module.exports =  {
  // SIGNUP GET 
  signupPost: (req, res) => {

    console.log(req.file)
    console.log(req.body)
    const user = new User(req.body);
    user.image = req.file
    user
      .save()
      .then(user => {
        console.log(user)
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"})
        return res.send({status: 200, success: true, token:token})
      })
      .catch(err => {
        console.log(err)
        return res.send({status: 401, success: false });
      })
  },

  // LOGIN POST
  loginPost: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username}, "username password")
    .then(user => {
      if (!user ) {
        // User not found
        return res.json({ status: 401, message: "Error: Wrong Username or Password" });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).json({ status: 402, message: "Error: Wrong Username or Password" });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: "60 days"
        });
        // Set a cookie and redirect to root
        return res.json({status: 200, message: "Success: Logged in", token: token})
      });
    })
    .catch(err => {
      console.log(err);
      return res.json({status: 403, message: "Failed: Unauthorized login"})
    });
  },


  hi : (req, res) => {
    console.log(req.file)
    res.send({msg: 'hi'})
  },

  hello: async (req, res) => {
    const gfs = getGfs(conn)
    gfs.files.findOne({ filename: '27f04678a3e9816c830b47aa2646a7bf.jpg'}, (err, file) => {
      if (!file || file.lenth === 0) {
        return res.status(404).json({
          err: 'file name mismatch/ file not found.'
        })
      } else {
        return res.status(200).json(file)
      }
    });
  }
}
