const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ID_user: String,
    user_name: String,
    user_firstname: String,
    email: String,
    birth_date: Date,
    inscription_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
