import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: 'user',
    },
}, {
    timestamps: true,
})


const User = mongoose.model('User', userSchema)

module.exports = User