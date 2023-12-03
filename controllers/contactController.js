//import express async handler
const asyncHandler = require("express-async-handler");
//import the real database model which we are created
const Contact = require("../models/contactModels");

//We use async await in each of the route so that it can communicate with mongo server easily
//and also to make sure all routes are executed one by one
//For this we use async handler middleware fn 
//@description get all contact
//route get /api/contacts
//access public
const getContacts = asyncHandler(async(req,res)=>{
    const contacts=await Contact.find();

    res.status(200).json(contacts);
 }); 


//@description create new contact
//route post /api/contacts
//access public
const createContact = asyncHandler(async (req,res)=>{
    //for user to take input
    console.log("the request body is :", req.body);

//for error handling so that user give input to those only require not any random thing 
   const {name , email , phone} = req.body;
   if(!name || !email || !phone){
    res.status(400);
    throw new Error('Please add all fields');
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contacts);
 });
//@description get contact
//route get /api/contacts:id
//access public
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
//access public
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error('Contact not found');
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
//access public
const deleteContact = asyncHandler(async (req,res)=>{
    try {
        const contact = await Contact.findOneAndDelete({ _id: req.params.id }).exec();
        if (!contact) {
            console.log(27);
            res.status(404).json({ error: 'Contact not found' });
            return; // Return to exit the function
        }
        res.status(200).json(contact);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Message Not", error: err });
    }
 });

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};