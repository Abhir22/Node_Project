const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add username"], 
    },
    email:{
        type: String,
        required: [true,"please add email"],
        unque: [true,"email taken"],
    },
    password: {
        type:String,
        required:[true,'please enter password'],
    },
 
},
{
    timestamps : true,
}
);
module.exports= mongoose.model("User",userSchema);