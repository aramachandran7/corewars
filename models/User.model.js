// MGDB Schema User model setup

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// All Users have these attributes
const userSchema = new Schema({
        // Not sure how to connect to the Autho0 schema :)
        nickname: {type: String, required:true},
        emails: {type: Array, required: true},
        user_id: {type: String, required:true},
        dateCreated: {type: Date, required: true},
        level: {type: Number, required: true},
        totalPlayTime: {type: Number, required: true},
        warriorCollection: {type: Array, required: true},
        lastPlayed: {type: Date, required: true},
    },
    {timestamps: true,}
)


const User = mongoose.model('User', userSchema)
module.exports = User
