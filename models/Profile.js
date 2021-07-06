const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	userId: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}, 
	phone:{
		type: mongoose.Schema.Types.String,
		ref: 'User',
		required: true
	},
	name: {
		type: String, 
		required: true
	},
	email: {
		type: String, 
		required: true
	},
	companyName: {
		type: String, 
		required: true
	},
	companyFbLink: {
		type: String, 
		required: true
    },
    address: {
		type: String, 
		required: true
    }, 
    
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;