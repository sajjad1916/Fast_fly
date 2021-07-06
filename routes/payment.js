const express = require('express');
const router = express.Router();

const {authenticateJWT }  = require('../middleware/authenticator');
const { paymentController,getPaymentController, updatePaymentController} = require('../controllers/payment');

router.post('/post',authenticateJWT, paymentController)
router.get('/get',authenticateJWT,getPaymentController);
router.post('/update', authenticateJWT, updatePaymentController);

module.exports = router;
