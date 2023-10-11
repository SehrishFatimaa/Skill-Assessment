const mongoose = require('mongoose');
const schema = mongoose.Schema;

const data = new schema({
    user: String,
    email: String,
    pass: String,


})

module.exports = mongoose.model('Data',data)