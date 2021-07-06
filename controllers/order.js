const Order = require('../models/Order')
const Profile = require('../models/Profile');

// for user
exports.orderController = async(req,res)=>{
    const {name,phone, address, money, deliveryCharge,refferenceID,merchentPhone, pickupAddress,merchentName, companyName,parcelType, instruction} = req.body;
   try{
    const profile = await Profile.find({ userId: req.user._id })
    if(profile.length == 0){
        return res.status(400).json({
            errorMessage: 'Please Create your profile'
        })
    }

    
    const newOrders = new Order();
    newOrders.userId = req.user._id;
    newOrders.name = name;
    newOrders.phone = phone;
    newOrders.money = money;
    newOrders.deliveryCharge = deliveryCharge;
    newOrders.address = address;
    newOrders.merchentPhone= merchentPhone;
    newOrders.pickupAddress = pickupAddress;
    newOrders.refferenceID = refferenceID;
    newOrders.merchentName=merchentName;
    newOrders.companyName=companyName;
    newOrders.parcelType= parcelType;
    newOrders.instruction = instruction;
    await newOrders.save();
    return res.status(200).json({
        successMessage: "Order Creation Success"
    })
   }
    catch(err){
        console.log('Order Controller error:', err);
        res.status(500).json({
            errorMessage: 'Order creation failed'
        })
    }
}

exports.getOrderController = async(req,res)=>{
    try{
        const order = await Order.find({ userId: req.user._id},null,{sort:{'createdAt':-1,}});
        if(order){
            return res.status(200).json({
                order
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

exports.idController = async(req,res) => {
    const {id} = req.body;
     await Order.findOne({ _id: id  })
     .then((order)=>{
        if (!order) {
            return res.status(400).json({
                errorMessage: 'Invalid userid',
            });
        }else{
            res.status(200).json({
                order,
                successMessage: 'Thank you for being with us!'
           })
        }
     })
       .catch ((err)=> {
         console.log('id error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     })

}

exports.getidController= async(req,res) => {
    
    // try {
    //    const orderData = await Order.find({
    //             orderId: req.orderid._id });

    //    res.status(200).json({
    //        orderData,
    //    })
    // } catch (err) {
    //     console.log('getorder error: ', err);
    //     res.status(500).json({
    //         errorMessage: 'please try again!',
    //     });
    // }
}

// for admin
exports.getRequestedOrderController = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ userId: req.user._id},{status:{ $in:'Order Requested' }}]},
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
exports.getPlacedOrderController = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ userId: req.user._id},{status:{ $in:'Order Placed' }}]},
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
exports.getPickedOrderController = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ userId: req.user._id},{status:{ $in:'Order Picked' }}]},         null, { sort: { 'createdAt': -1 }}).populate('orderId');
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
exports.getShipedOrderController = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ userId: req.user._id},{status:{ $in:'Order Delivered' }}]},
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
exports.getCompletedOrderController = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ userId: req.user._id},{status:{ $in:'Payment Completed' }}]},
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
exports.getCanceledOrderController = async(req,res)=>{
    try {
        const orderData = await Order.find({$and:[{ userId: req.user._id},{status:{ $in:'Order Canceled' }}]},
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

exports.getallorderController= async(req,res) => {
    try {
       const order = await Order.find({ status: { $ne: 'Payment Completed' , $ne:"Order Canceled" } },
        null, { sort: { 'createdAt': -1 }}).populate('userId');
       res.status(200).json({
           order,
       })
    } catch (err) {
        console.log('getorder error: ', err);
        res.status(500).json({
            errorMessage: 'please try again!',
        });
    }
}

exports.updateOptionController = async(req,res) => {
    try {
     const orderStatus= await Order.updateOne({_id: req.body.userId}, {status: req.body.status});

     res.json(
         {
             orderStatus,
         }
     )
     } catch (err) {
         console.log('update error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}

exports.updateDeliveryController = async(req,res) => {
    try {
     const orderDeliveryBoy= await Order.updateOne({_id: req.body.userId}, {deliveryBoy:req.body.deliveryBoy});

     res.json(
         {
             orderDeliveryBoy,
         }
     )
     } catch (err) {
         console.log('update error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}

exports.updateRequestedOrderController = async(req,res) => {
    const {phone, address, money, deliveryCharge,refferenceID,merchentPhone, pickupAddress,merchentName, parcelType, instruction} = req.body;
    try {
     const orderData= await Order.updateMany({_id: req.body._id}, {
        phone:phone, address:address, money:money, deliveryCharge:deliveryCharge,refferenceID:refferenceID, merchentPhone:merchentPhone , pickupAddress:pickupAddress, merchentName:merchentName, parcelType:parcelType, instruction:instruction
     });

     res.json(
         {
             orderData,
         }
     )
     } catch (err) {
         console.log('update error: ', err);
         res.status(500).json({
             errorMessage: 'please try again!',
         });
     }
}