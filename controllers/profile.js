const Profile = require('../models/Profile');

exports.profileController= async(req,res) =>{
    const {name, address, companyFbLink, companyName,email} = req.body;

    try{
        const profile = await Profile.findOne({userId: req.user._id});
        if(profile) {
            return res.status(404).json({
                errorMessage: "Profile already created",
            });
        }
        const newProfile = new Profile({
            userId: req.user._id,
            phone: req.user.phone,
            name,
            address,
            companyName,
            companyFbLink,
            email
        });
        await newProfile.save();
        return res.status(200).json({
            successMessage: 'Profile creation success',
            success:true
        });
    }
    catch(err){
        console.log('Profile Controller error,',err);

        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
}
exports.getProfileController = async(req,res)=>{
    
    try{
        console.log(req.user);
    const profile = await Profile.find({userId: req.user._id})
    if(profile){
        return res.status(200).json({
            profile,
        });
    }
     }
     catch(err){
         console.log('getProfileController error, :' , err);
         return res.status(500).json({
             errorMessage: 'Please Try again',

         });
     }
}
exports.updateProfileController= async(req,res) =>{
    const {name, address, companyFbLink, companyName,email} = req.body;

    try{
        
        const notprofile = await Profile.findOne({userId: req.user._id});
        if(!notprofile) {
            return res.status(404).json({
                errorMessage: "Please Create Your profile first!",
            });
        }
        
        const profile = await Profile.updateMany({userId: req.user._id},{name: name, address:address, companyFbLink:companyFbLink, companyName:companyName, email:email});

        return res.status(200).json({
            successMessage: 'Profile changed success',
            success:true,
            profile
        });
    }
    catch(err){
        console.log('Profile Controller error,',err);

        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
}










