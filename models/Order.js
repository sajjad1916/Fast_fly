const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  
	userId: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},  
	
	name: {
		type: String, 
		required: true
	},
	pickupAddress: {
		type: String, 
		required: true
	},
	merchentPhone: {
		type: String, 
		required: true
	},
	merchentName: {
		type: String, 
		required: true
	},
	companyName: {
		type: String, 
		required: true
	},
	refferenceID: {
		type: String, 
		required: true
	},
		phone: {
		type: String, 
		required: true
	},
	address: {
		type: String, 
		required: true
    },
    money:{
        type:String,
        required: true
	},
	deliveryCharge:{
		type:String,
		required: true
	},
	status: {
		type: String, 
		default: 'Order Requested'
	},
	deliveryBoy: {
		type: String,
		default:'0'
	},
	parcelType: {
		type: String,
		default:'Normal'
	},
	instruction: {
		type: String,
		default:'0'
	},
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;