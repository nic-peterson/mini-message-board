const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");

// Routes
const messagesRouter = require("./routes/messages");
app.use("/messages", messagesRouter);

// Redirect root to /messages
app.get("/", (req, res) => {
  res.redirect("/messages");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
