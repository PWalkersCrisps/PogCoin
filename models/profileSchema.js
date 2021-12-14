const mongoose = require('mongoose');
// How the fuck do you expect me to explain this??
const profileModel = new mongoose.Schema({
    userID: { type: mongoose.SchemaTypes.String, require: true, unique: true },
    coins: { type: mongoose.SchemaTypes.Number, default: 1 },
    dailyTimestamp: { type: mongoose.SchemaTypes.Number },
    robTimestamp: { type: mongoose.SchemaTypes.Number },
    totalCoinsEarnt: { type: mongoose.SchemaTypes.Number },
    coinsDonated: { type: mongoose.SchemaTypes.Number },
    coinsReceived: { type: mongoose.SchemaTypes.Number },
    netGamble: { type: mongoose.SchemaTypes.Number },
    robSuccess: { type: mongoose.SchemaTypes.Number },
    robFails: { type: mongoose.SchemaTypes.Number },
    timesRobbed: { type: mongoose.SchemaTypes.Number },
});

const model = mongoose.model('ProfileModels', profileModel);
module.exports = mongoose.model('Profile', profileModel);