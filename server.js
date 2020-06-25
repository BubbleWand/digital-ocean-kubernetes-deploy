require('dotenv').config();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const checkUser = require("./utils/checkUser");

// enabling cors
const cors = require('cors');
const express = require('express');
let app = express();
app.use(cors());
app.options('*', cors());

// Use Body Parser
app.use(bodyParser.json({
  limit: '25mb'
}));
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '25mb'
}));


// Add after body parser initialization!
app.use(expressValidator());

// enable JWT
app.use(cookieParser());

// setup user auth
app.use(checkUser);


// router
const indexRouter = require('./controllers/index');
app.use('', indexRouter);

const port = process.env.PORT
app.listen(port, () => console.log(`BubbleBlower listening on port ${port}!`))