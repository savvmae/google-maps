const mongoose = require('mongoose')
, Schema = mongoose.Schema;

const UsersSchema = new mongoose.Schema({

userName: {type: String, required: true}, 
email: {type: String, required: true, unique: true}, 
password: {type: String, required: true}

});

const Users = mongoose.model('Users', UsersSchema);

module.exports =  Users 