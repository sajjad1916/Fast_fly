const mongoose = require('mongoose');


const DeliverySchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        boy: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);


const Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery ;
