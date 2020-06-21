const User = require("../models/user");
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;

const checkUser = (req, res, next) => {
  if (req.body.token !== null || req.query.token !== null) {
    let token = "";
    if (req.query.token != null) {
      token = req.query.token;
    } else {
      token = req.body.token;
    }
    const decodedToken = null
    try {
      decodedToken = jwt.verify(token, SECRET_KEY);
      console.log("user found")
      req.user = decodedToken.payload;
    } catch (e) {
      req.user = null;
    }

  } else {
    req.user = null;
    console.log("no user")
  }
  next();
};


module.exports = checkUser;