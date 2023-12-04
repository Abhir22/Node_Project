
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModels");


//@description get all contact
//route get /api/contacts
//access private
const getContacts = asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id: req.user.id});
    console.log("123");
    res.status(200).json(contacts);
 }); 
 

//@description create new contact
//route post /api/contacts
//access private
const createContact = asyncHandler(async (req,res)=>{

    console.log("the request body is :", req.body);


    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
    res.status(400);
    throw new Error('Please add all fields');
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contacts);
 });
//@description get contact
//route get /api/contacts:id
//access private
const getContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
 });
//@description update contact
//route put /api/contacts:id
//access private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if(contact.user_id.toString() !==req.user.id){
        res.status(403);
        throw new Error('You are not authorized to perform this action');
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {new: true},
    );
    res.status(200).json(updatedContact);
 });

//@description delete contact
//route delete /api/contacts:id
//access private
const deleteContact = asyncHandler(async (req,res)=>{
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.id }).exec();
        if (!contact) {
            console.log(27);
            res.status(404).json({ error: 'Contact not found' });
            return; // Return to exit the function
        }
        if(contact.user_id.toString() !==req.user.id){
            res.status(403);
            throw new Error('You are not authorized to perform this action');
        }
        res.status(200).json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Message Not", error: err });
    }
 });

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};