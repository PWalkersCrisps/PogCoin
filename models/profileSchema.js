const mongoose = require("mongoose");
//How the fuck do you expect me to explain this??
const profileSchema = new mongoose.Schema({
    userID: {type: mongoose.SchemaTypes.String, require: true, unique: true},
    coins: {type: mongoose.SchemaTypes.Number, default: 0},
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = mongoose.model("Profile", profileSchema);