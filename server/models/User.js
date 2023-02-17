import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        required: [true, 'Password is required'],
        type: String,
    }
})


const User = mongoose.model('User', UserSchema)

export default User

