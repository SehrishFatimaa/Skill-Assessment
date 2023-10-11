const mongoose = require('mongoose');
const mongooseURI = "mongodb://127.0.0.1:27017/?readPreference=primary&tls=false&directConnection=true"

const connectToMongo =() =>{
    mongoose.connect(mongooseURI);
    console.log('Connected to mongo successfully');
    }


module.exports = connectToMongo;