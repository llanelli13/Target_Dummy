const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID_user: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    user_name: String,
    user_firstname: String,
    password: String,
    email: String,
    birth_date: Date,
    inscription_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
