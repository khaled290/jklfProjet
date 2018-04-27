const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    pwd: String,
    skills : []
});

module.exports = mongoose.model('User', userSchema);