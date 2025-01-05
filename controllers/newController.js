const asyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const newController = {
  getNew: asyncHandler(async (req, res) => {
    res.render("new");
  }),
};

module.exports = newController;
