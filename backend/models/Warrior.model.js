// MGDB Schema User model setup

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// All Users have these attributes
const warriorSchema = new Schema({
        // Not sure how to connect to the Autho0 schema :)
        name: {type: String, required:true},
        dateCreated: {type: Date, required: true},
        commandList: {type: Array, required: true},
    },
    {timestamps: true,}
)


const Warrior = mongoose.model('User', warriorSchema)
module.exports = Warrior
