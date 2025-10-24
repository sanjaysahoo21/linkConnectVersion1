const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role : {
        type: String,
        required: true,
        enum: ['admin', 'teacher', 'student'],
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, role: this.role}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'});
    return token;
}

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().min(3).max(30).required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        rollNumber: joi.string().required().label('Roll Number'),
        role: joi.string().valid('admin','faculty','student').required().label('Role'),  // 'admin', 'teacher', 'student' only
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    });
    return schema.validate(data);
}

module.exports = {User, validate};