const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    phone: {type: String, required: true},
    password: {type: String, required: true},
    queries: Array
})
module.exports = mongoose.model('data', userSchema);
