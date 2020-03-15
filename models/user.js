const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fbId: { type: String, required: true },
    subscription: { type: String, required: true },
    sport: { type: String, required: true },
    league: { type: String, required: true },
    team: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);