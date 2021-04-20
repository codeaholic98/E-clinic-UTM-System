const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role:{
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = userSchema;

//helpful fuctions

userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

userSchema.methods.comparePassword = function(plaintext, callback){
    return callback(null, bcrypt.compareSync(plaintext, this.password))
}