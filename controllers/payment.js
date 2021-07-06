const Payment = require('../models/Payment');
exports.paymentController= async(req,res) =>{
    const {bkashMethod, bkashNumber, nagadMethod, nagadNumber, 
            bankAccountName, bankAccountNumber, bankName, bankBranchName
    } = req.body;

    try{
        const payment = await Payment.findOne({userId: req.user._id});
        if(payment) {
            return res.status(404).json({
                errorMessage: "Payment already added",
            });
        }
        
        const newPayment = new Payment({
            userId: req.user._id,
            bkashMethod, bkashNumber, nagadMethod, nagadNumber, 
            bankAccountName, bankAccountNumber, bankName, bankBranchName
        });
        await newPayment.save();
        return res.status(200).json({
            successMessage: 'Payment addition success',
            success:true
        });
    }
    catch(err){
        console.log('Payment Controller error,',err);

        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
}
exports.getPaymentController = async(req,res)=>{
    
    try{
        ;
    const payment = await Payment.find({userId: req.user._id})
    if(payment){
        return res.status(200).json({
            payment,
        });
    }
     }
     catch(err){
         console.log('getPaymentController error, :' , err);
         return res.status(500).json({
             errorMessage: 'Please Try again',

         });
     }
}
exports.updatePaymentController= async(req,res) =>{
    const {bkashMethod, bkashNumber, nagadMethod, nagadNumber, 
        bankAccountName, bankAccountNumber, bankName, bankBranchName} = req.body;

    try{
        
        const notpayment = await Payment.findOne({userId: req.user._id});
        if(!notpayment) {
            return res.status(404).json({
                errorMessage: "Please Add Your payment first!",
            });
        }
        
        const payment = await Payment.updateMany({userId: req.user._id},{bkashMethod:bkashMethod, bkashNumber:bkashNumber, nagadMethod:nagadMethod, nagadNumber:nagadNumber, 
            bankAccountName:bankAccountName, bankAccountNumber:bankAccountNumber, bankName:bankName, bankBranchName:bankBranchName});

        return res.status(200).json({
            successMessage: 'Payment changed success',
            success:true,
            payment
        });
    }
    catch(err){
        console.log('Payment Controller error,',err);

        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
}
