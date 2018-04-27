const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    user: String,
    name: String,
    lastName: String,
    mail: String,
    city: String,
    skills : []
});

module.exports = mongoose.model('Movie', movieSchema);