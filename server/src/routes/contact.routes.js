const express = require("express");
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controller/contact.controller.js');

const router = express.Router();

router.post('/contact', createContact);  
router.get('/contact', getAllContacts);        
router.get('/contact/:id', getContactById);     
router.patch('/contact/:id', updateContact);      
router.delete('/contact/:id', deleteContact);  

module.exports = router;
