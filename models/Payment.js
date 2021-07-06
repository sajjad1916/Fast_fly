const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
	userId: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}, 
	bkashMethod:{
		type: String,
        default: 0,
	},
    bkashNumber:{
		type: String,
        default: 0,
	},
    nagadMethod:{
		type: String,
        default: 0,
	},
    nagadNumber:{
		type: String,
        default: 0,
	},
    bankAccountName:{
		type: String,
        default: 0,
	},
    bankAccountNumber:{
		type: String,
        default: 0,
	},
    bankName:{
		type: String,
        default: 0,
	},
    bankBranchName:{
		type: String,
        default: 0,
	},
	
    
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;