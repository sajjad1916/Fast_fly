const express = require('express');
const router = express.Router();
const {profileValidator,profileValidatorResult} = require('../middleware/profileValidator');
const {authenticateJWT }  = require('../middleware/authenticator');
const { profileController,getProfileController, updateProfileController} = require('../controllers/profile');

router.post('/post',profileValidator, profileValidatorResult,authenticateJWT, profileController)
router.get('/get',authenticateJWT,getProfileController);
router.post('/update', authenticateJWT, updateProfileController);

module.exports = router;
