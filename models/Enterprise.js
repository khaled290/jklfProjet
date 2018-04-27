const enterpriseSchema = mongoose.Schema({
    siret: String,
    enterpriseName: String,
    name: String,
    lastName: String,
    email: String,
    pwd: String,
    skills : []
});

module.exports = mongoose.model('Enterprise', enterpriseSchema);