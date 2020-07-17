const router = require('express').Router();
const auth = require('./auth');
const image = require('./image');
const user = require('./user');
const upload = require('../utils/uploader');

// ping stats
router.get('/', (req, res) => res.status(200).send('pong'));

// authentication routes
router.post('/login', auth.loginPost);
router.post('/signup', upload.single('profilePhoto'), auth.signupPost);

// image getter
router.get('/img/:imgName', image.imgGet);
router.post('/img/:imgName/delete', image.imgDeletePost);

// user settings
router.post('/updateSettings', user.updateSettings);

module.exports = router