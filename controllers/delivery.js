const Delivery = require('../models/Delivery');
const Order = require('../models/Order')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = process.env;

exports.deliverySignupController = async (req, res) => { 
    const { phone, password } = req.body; 
    try {
        const delivery = await Delivery.findOne({ phone });
        if (delivery) {
        return res.status(400).json({
                errorMessage: 'Phone Number already exists',
            });
        }
       
        const newDelivery = new Delivery();
        newDelivery.phone = phone;     
        const salt = await bcrypt.genSalt(10);
        newDelivery.password = await bcrypt.hash(password, salt);
        await newDelivery.save();     
        
            return res.json({
                successMessage: 'Registration success.',
            });
    
    } catch (err) {
        console.log('deliveryController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

exports.deliverySigninController = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await Delivery.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                errorMessage: 'Invalid Phone',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errorMessage: 'Invalid Password',
            });
        }

        const payload = {
            user: {
                _id: user._id,
                phone,
                boy:user.boy,
            },
        };

        jwt.sign(payload, jwtSecret, (err, token) => {
            if (err) return console.log('jwt error: ', err);
            const { _id, phone, boy } = user;

             res.json({
                token,
                user: { _id, phone, boy },
                successMessage:'user is varified'
            });
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            errorMessage: 'Server error',
            
        });
    }
};


exports.getOrderControllerDelivery = async(req,res)=>{
    try{
        const order = await Order.find({ deliveryBoy: req.user.boy},null,{sort:{'createdAt':-1,}});
        if(order){
            return res.status(200).json({
                order,
                
            })
        }
        
    }
    catch(err){
        console.log('getOrder controller error: ',err);
        res.status(500).json({
            errorMessage: 'Please try again'
        })
    }
}
exports.updateOptionControllerDelivery = async(req,res) => {
    try {
     const orderStatus= await Order.updateOne({_id: req.body._id}, {status: req.body.status});

     res.json(
         {
             orderStatus,
             successMessage:"Order Changed"
         }
     )
     } catch (err) {
         console.log('update error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}
exports.getPlacedOrderControllerDelivery = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ deliveryBoy: req.user.boy},{status:{ $in:'Order Placed' }}]},         null, { sort: { 'createdAt': -1 }}).populate('orderId');
        res.status(200).json({
            orderData,
        })
     } catch (err) {
         console.log('getorder error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}

exports.getPickedOrderControllerDelivery = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ deliveryBoy: req.user.boy},{status:{ $in:'Order Picked' }}]},         null, { sort: { 'createdAt': -1 }}).populate('orderId');
        res.status(200).json({
            orderData,
        })
     } catch (err) {
         console.log('getorder error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}
exports.getShipedOrderControllerDelivery = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ deliveryBoy: req.user.boy},{status:{ $in:'Order In Shipment' }}]},
         null, { sort: { 'createdAt': -1 }}).populate('orderId');
        res.status(200).json({
            orderData,
        })
     } catch (err) {
         console.log('getorder error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}
exports.getCompletedOrderControllerDelivery = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ deliveryBoy: req.user.boy},{status:{ $in:'Order Completed' }}]},
         null, { sort: { 'createdAt': -1 }}).populate('orderId');
        res.status(200).json({
            orderData,
        })
     } catch (err) {
         console.log('getorder error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}