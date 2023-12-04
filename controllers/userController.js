const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@description register user
//route POST /api/users/register
//access public
const registerUser = asyncHandler( async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email ||!password){
        res.status(400);
        throw new Error('All feild are mandatory');
    }
    console.log("1");
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
    res.status(400);
    throw new Error('Email already in use');
}
    const hashPassword = await bcrypt.hash(password,10);
    console.log("hash password:" ,hashPassword);
    const createdUser = await User.create({ username, email, password : hashPassword});
    console.log(`Created User: ${createdUser}` );
    if(createdUser){
        res.status(200).json({_id: createdUser.id,email: createdUser.email});
    }else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message : " register the user"});
});   
//@description login user
//route POST /api/users/login
//access public
//install jsonwebtoken for auhentication purpose npm i jsonwebtoken
const loginUser= asyncHandler( async (req,res)=>{
    const {email,password} = req.body;
    console.log("1");
    if(!email || !password){
        console.log("2");
        res.status(400);
        throw new Error('All feild are mandatory'); 

    }
    console.log("3");
    const user = await User.findOne({ email });
    console.log("4");
// Compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        console.log("5");
        const acessToken = jwt.sign(
            {   
                user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }, 
        
        }, process.env.ACCESS_TOKEN_SECRET, 
        console.log("6"),
        //token validation time
        {expiresIn:"15m"}
        );
        console.log("7");
        res.status(200).json({acessToken});

    }else{
        res.status(401);
        throw new Error("Email or password not valid");
    }
});
//@description current user
//route GET /api/users/current
//access Private
const currentUser = asyncHandler( async (req,res)=>{

    res.json(req.user);
});
module.exports = {registerUser,loginUser,currentUser};