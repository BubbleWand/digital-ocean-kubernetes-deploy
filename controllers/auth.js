const jwt = require('jsonwebtoken')
const User = require('../models/user');
const conn = require('../data/bubble-db');
require('dotenv').config();


module.exports =  {
  // SIGNUP GET 
  signupPost: (req, res) => {
    const user = new User(req.body);
    user.profilePhoto = req.file.filename;
    user.save()
      .then(user => {
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"})
        return res.status(200).json({ msg: "success", token: token});
      })
      .catch(err => {
        console.log('or here?')
        return res.status(404).json({err: err})
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

}
