const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../moddleware/validateTokenHandler");

// Define the routes
router.get("/", validateToken, getContacts); // Retrieve all contacts (requires token validation)

router.post("/", validateToken, createContact); // Create a new contact (requires token validation)

router.get("/:id", validateToken, getContact); // Retrieve a specific contact (requires token validation)

router.put("/:id", validateToken, updateContact); // Update a specific contact (requires token validation)

router.delete("/:id", validateToken, deleteContact); // Delete a specific contact (requires token validation)

module.exports = router;