const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
console.log("8");
const validateToken = asyncHandler (async (req,res,next) => {
    console.log("12");
    let token;
    console.log("9");
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("10");
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log("11");
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error('Unauthorized Access');
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("token not recieved ");
        }

    }
});
module.exports = validateToken;