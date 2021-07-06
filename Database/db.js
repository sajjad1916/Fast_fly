const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        mongoose.connect(process.env.mongoURI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Database connected')
    }catch(error){
        console.log('Database connection error!', error);
    }
}

module.exports = connectDB