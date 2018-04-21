const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: String,
    name: String,
    lastName: String,
    mail: String,
    city: String,
    skills : []
});

module.exports = mongoose.model('User', userSchema);