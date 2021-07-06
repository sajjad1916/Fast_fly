const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = process.env;


exports.signupController = async (req, res) => { 
    const { phone, password } = req.body; 
    try {
        const signup = await User.findOne({ phone });
        if (signup) {
        return res.status(400).json({
                errorMessage: 'Phone Number already exists',
            });
        }
       
        const newUser = new User();
        newUser.phone = phone;     
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();     
        const user = await User.findOne({ phone });
        const payload = {
            user: {
                _id: user._id,
                phone,
            },
        };

        jwt.sign(payload, jwtSecret, (err, token) => {
            if (err) return console.log('jwt error: ', err);
            const { _id, phone, role } = user;

            return res.json({
                token,
                user: { _id, phone, role },
                successMessage: 'Registration success.',
            });
        });
    } catch (err) {
        console.log('signupController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};



exports.signinController = async (req, res) => {
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
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
            },
        };

        jwt.sign(payload, jwtSecret, (err, token) => {
            if (err) return console.log('jwt error: ', err);
            const { _id, phone, role } = user;

             res.json({
                token,
                user: { _id, phone, role },
                successMessage:'user is varified'
            });
        });
    } catch (err) {
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

exports.forgetPassword = async(req,res)=>{
    const {phone} = req.body;
    try{
        const check = await User.findOne({phone});
        if(check){
            res.status(400).json({ 
                errMessage: 'Phone number already exist!'
            })
        }
        else{
            res.status(200).json({
                successMessage:false
            })
        }
    
    }
    catch(err){
        res.status(500).json({
            errorMessage:'Server error',
        })
    }
}

exports.updatePassword = async(req,res)=>{
    const {phone,password} = req.body;
    try{
        const check = await User.find({phone});
        if(!check){
            return res.status(400).json({
                errorMessage: "Invalid phone number"
            })
        }
        const id = check[0]._id;
        console.log(check[0]._id)
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        const updatepass = await User.updateOne({_id:id},{password:newPassword});
        return res.status(200).json({
            successMessage: 'Successfully changed the password',
            updatepass,
            
        })
    }
    catch(err){
       return  res.status(500).json({
            errorMessage:'Server error',
        })
    }
}

exports.changePassword = async(req,res)=>{
    const {password, newPassword } = req.body;
    try{
        const user = await User.findOne({ _id: req.user._id})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                errorMessage: 'Invalid password',
            });
        };
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(newPassword, salt);
        const updatepass = await User.updateOne({ password:newpassword });
        return res.status(200).json({
            successMessage: 'Successfully changed the password'
        })
    }
    catch(err){ 
        return res.status(500).json({
            errorMessage:'Server error',
        })

    }
}

