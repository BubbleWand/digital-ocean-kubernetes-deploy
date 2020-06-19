const router = require('express').Router();
const auth = require('./auth');
const image = require('./image');
const upload = require('../utils/uploader');

// authentication routes
router.post('/login', auth.loginPost);
router.post('/signup', upload.single('profilePhoto'), auth.signupPost);

// image getter
router.get('/img/:imgName', image.imgGet);
router.post('/img/:imgName/delete', image.imgDeletePost);

module.exports = router