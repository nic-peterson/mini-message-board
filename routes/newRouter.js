const { Router } = require("express");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("new");
});

newRouter.post("/", (req, res) => {
  const { message, author } = req.body;
  req.app.locals.messages.push({
    text: message,
    user: author,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = newRouter;
