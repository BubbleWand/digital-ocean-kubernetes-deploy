const router = require('express').Router();
const auth = require('./auth');
const upload = require('../utils/uploader');

// authentication routes
router.post('/login', auth.loginPost);
router.post('/signup', upload.single('image'), auth.signupPost);
router.post('/hi', upload.single('image'), auth.hi);
router.get('/hello', auth.hello)

module.exports = router