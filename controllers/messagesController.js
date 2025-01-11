const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const messagesController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await db.getAllMessages();
      if (!messages || messages.length === 0) {
        return res.render("index", {
          title: "Mini Message Board",
          messages: [],
        });
      }

      const formattedMessages = messages.map((message) => ({
        text: message.message,
        user: message.username,
        created_at: message.created_at,
      }));

      res.render("index", {
        title: "Mini Message Board",
        messages: formattedMessages,
      });
    } catch (err) {
      if (err instanceof CustomNotFoundError) {
        res.status(404).render("error", {
          title: "Not Found",
          message: err.message,
        });
      } else {
        console.error("Error fetching messages:", err);
        res.status(500).send("Internal Server Error");
      }
    }
  },

  renderNewMessageForm: (req, res) => {
    res.render("form", { title: "Add a New Message" });
  },

  addNewMessage: async (req, res) => {
    const { username, message } = req.body;
    try {
      await db.addMessage(username, message);
      res.redirect("/messages");
    } catch (err) {
      console.error("Error adding message:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteAllMessages: async (req, res) => {
    try {
      await db.deleteAllMessages();
      res.redirect("/messages");
    } catch (err) {
      console.error("Error deleting messages:", err);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = messagesController;
