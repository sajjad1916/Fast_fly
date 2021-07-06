const express = require('express');
const router = express.Router();
const {getOrderControllerDelivery,
updateOptionControllerDelivery,
getCompletedOrderControllerDelivery,
getPickedOrderControllerDelivery,
getShipedOrderControllerDelivery,
getPlacedOrderControllerDelivery
} = require('../controllers/delivery')
const {authenticateJWT,authenticateDeliveryJWT }  = require('../middleware/authenticator');
const {
    orderController, 
    getOrderController,
    idController,
    getidController,
    getallorderController,
    updateOptionController,
    getPlacedOrderController,
    getPickedOrderController,
    getShipedOrderController,
    getCompletedOrderController,
    getCanceledOrderController,
    updateDeliveryController,
    getRequestedOrderController,
    updateRequestedOrderController
} = require('../controllers/order');

router.post('/place',authenticateJWT, orderController);
router.get('/get',authenticateJWT, getOrderController);
router.get('/get/requested',authenticateJWT,getRequestedOrderController);
router.put('/post/requested',authenticateJWT,updateRequestedOrderController);
router.get('/get/placed',authenticateJWT,getPlacedOrderController);
router.get('/get/picked',authenticateJWT,getPickedOrderController);
router.get('/get/delivered',authenticateJWT,getShipedOrderController);
router.get('/get/completed',authenticateJWT,getCompletedOrderController);
router.get('/get/canceled',authenticateJWT,getCanceledOrderController);

router.post('/id', authenticateJWT, idController)
router.get('/id', authenticateJWT, getidController)

router.get('/orders', getallorderController)
router.post('/option', updateOptionController)
router.post('/delivery/assign',updateDeliveryController)

router.get('/delivery/get',authenticateDeliveryJWT,getOrderControllerDelivery);
router.post('/delivery/update',authenticateDeliveryJWT,updateOptionControllerDelivery);
router.get('/delivery/get/picked',authenticateDeliveryJWT,getPickedOrderControllerDelivery);
router.get('/delivery/get/placed',authenticateDeliveryJWT,getPlacedOrderControllerDelivery);
router.get('/delivery/get/shipment',authenticateDeliveryJWT,getShipedOrderControllerDelivery);
router.get('/delivery/get/completed',authenticateDeliveryJWT,getCompletedOrderControllerDelivery);


module.exports = router;
