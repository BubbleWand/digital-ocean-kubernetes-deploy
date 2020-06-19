const router = require('express').Router();
const auth = require('./auth');
const image = require('./image');
const upload = require('../utils/uploader');

// authentication routes
router.post('/login', auth.loginPost);
router.post('/signup', upload.single('image'), auth.signupPost);

// image getter
router.get('/img/:imgName', image.imgGet);

module.exports = router