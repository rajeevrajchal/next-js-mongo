import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    user_name: {
        type:String,
        required:[
            true,
            "user_name is required"
        ],
        unique: true
    },
    password: {
        type:String,
        required:[
            true,
            "password is required"
        ]
    },
    email: {
        type:String,
        required:[
            true,
            "email is required"
        ],
        unique: true
    },
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
