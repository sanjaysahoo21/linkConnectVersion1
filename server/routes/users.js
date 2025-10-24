const router = require('express').Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/',async(req,res)=>{
    try {
        // Validate request body
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});

        // Check if user already exists
        const user = await User.findOne({email:req.body.email})
        if(user)
            return res.status(409).send({message:'user already exists'});

        // Hash password - use default salt rounds if SALT env var is not set
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save new user
        await new User({...req.body, password:hashedPassword}).save();
        res.status(201).send({message:'user created successfully'});
    } catch(error) {
        console.error('Error in user registration:', error);
        return res.status(500).send({message:'internal server error'});
    }
})

module.exports = router;