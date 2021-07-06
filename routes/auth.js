const express = require('express');
const router = express.Router();

const {
    signupValidator,
    signinValidator,
    validatorResult,
} = require('../middleware/validator');
const {deliveryValidator, deliveryvalidatorResult} = require('../middleware/delivery')
const {deliverySignupController,deliverySigninController} =require('../controllers/delivery');
const { signupController, signinController,forgetPassword,updatePassword,changePassword } = require('../controllers/auth');
const {authenticateJWT ,}  = require('../middleware/authenticator');



router.post('/signup',signupValidator, validatorResult ,signupController);
router.post('/signin', signinValidator, validatorResult, signinController);
router.post('/forget/password',forgetPassword);
router.post('/forget/updatepassword',updatePassword);
router.post('/change/password',authenticateJWT,changePassword);






// delivery man login and signup
router.post('/delivery/signup',signupValidator, validatorResult ,deliverySignupController);
router.post('/delivery/signin',signupValidator, validatorResult ,deliverySigninController);


module.exports = router;
