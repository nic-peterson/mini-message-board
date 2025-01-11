const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const messagesController = require("../controllers/messagesController");

// GET /messages - Retrieve all messages
router.get("/", messagesController.getAllMessages);

// GET /messages/new - Display form to create a new message
router.get("/new", messagesController.renderNewMessageForm);

// POST /messages/new - Add a new message to the DB
router.post("/new", messagesController.addNewMessage);

// GET /messages/delete - Delete all messages
router.get("/delete", messagesController.deleteAllMessages);

module.exports = router;
