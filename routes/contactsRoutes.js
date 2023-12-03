const express = require("express");
const router = express.Router();
const {getContacts,createContact,getContact,updateContact,deleteContact} = require("../controllers/contactController");

router.route("/").get(getContacts);

//router.route("/").get();

router.route("/").post(createContact);
//for individual id
router.route("/:id").get(getContact); 

router.route("/:id").put(updateContact); 

router.route("/:id").delete(deleteContact);

module.exports = router;