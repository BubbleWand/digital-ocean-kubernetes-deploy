const jwt = require('jsonwebtoken')
const User = require('../models/user');
const conn = require('../data/bubble-db');
require('dotenv').config();


module.exports = {
  // SIGNUP POST 
  signupPost: (req, res) => {
    const { 
      username, 
      password, 
      displayName, 
      phone, 
      email, 
      profilePhoto 
    } = req.body; // define each field to prevent unwanted fields from being sent.
    const newUser = new User({ username, password, displayName, phone, email, profilePhoto });
    newUser.profilePhoto = req.file.profilePhoto;
    newUser.save((err, user) => {
      if (err) {
        return res.send({ "errors": [ "That account already exists!" ] });
      }
      const token = jwt.sign({
        _id: user._id
      }, process.env.SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE
      });
      return res.status(200).json({
        msg: "success",
        token: token,
        user
      });
    });
  },


  // LOGIN POST
  loginPost: (req, res) => {
    const { username, password } = req.body;
    
    User.findOne({
        username
      }, "username password")
      .then(user => {
        // Check the password
        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            // Password does not match
            return res.status(401).json({
              status: 402,
              message: "Error: Wrong Username or Password"
            });
          }
          // Create a token
          const token = jwt.sign({
            _id: user._id,
            username: user.username
          }, process.env.SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE
          });
          // Set a cookie and redirect to root
          return res.json({
            status: 200,
            message: "Success: Logged in",
            token: token
          })
        });
      })
      .catch(err => {
        // User not found
        return res.json({
          status: 401,
          message: "Error: Wrong Username or Password"
        });
        // console.log(err);
        // return res.json({
        //   status: 403,
        //   message: "Failed: Unauthorized login"
        // });
      });
  },

}