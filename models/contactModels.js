const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name: { 

        type: String,
        required: [true, "Please add contact name"],
    },
    email: {
        type: String, 
        require: [true, "Please add contact email address"],
    },
    phone: {
        type: String,
        require: [true , "Please add phone no "],
    },
},{
    timestamps: true,
}
);

module.exports = mongoose.model("Contact" , contactSchema);