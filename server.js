require('dotenv').config();
const express = require('express');
const app  = express();
const cors = require('cors');
const morgan = require('morgan');
const cookie = require('cookie-parser');
const path = require('path');
const connectDB  = require('./Database/db');





connectDB();



app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookie());

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/profile' , require('./routes/profile'));
app.use('/api/order', require('./routes/order'));
app.use('/api/payment', require('./routes/payment'));



if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.use('/*' ,(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Listening on port : ${PORT}`)});
