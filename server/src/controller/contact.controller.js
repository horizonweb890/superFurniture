const Contact = require("../model/contact.model.js");

const createContact = async (req, res) => {
  try {
    const { name, email, contact, description } = req.body;

    const newContact = new Contact({
      name, email, contact, description
    });

    const userContact = await newContact.save();

    res.status(200).json(userContact);
  } catch (err) {
    console.log(err);
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving contact" });
  }
};

const updateContact = async (req, res) => {
  try {
    const { name, email, contact, description } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, contact, description },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating contact" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting contact" });
  }
};

module.exports = { createContact, getAllContacts, getContactById, updateContact, deleteContact };
