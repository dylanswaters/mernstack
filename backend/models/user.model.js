const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },// Added this part in, hope it doesn't break anything
    // password: {
    //     type: String,
    //     required: true
    // },
    user_right: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema)

module.exports = User;
