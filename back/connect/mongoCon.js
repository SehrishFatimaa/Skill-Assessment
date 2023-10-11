const mongoose = require('mongoose');

const connectDB =()=>{
    try{

        mongoose.connect('mongodb://127.0.0.1:27017/test')
    }
    catch(err){
        console.log('DB connection error',err)
    }
}

module.exports = connectDB;