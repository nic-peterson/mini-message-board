const express = require("express");
const app = express();
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");

const assetPath = path.join(__dirname, "assets");
app.use(express.static(assetPath));

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Then add your links middleware BEFORE your route handlers

// AFTER middleware, add route handlers
app.use("/", indexRouter);
app.use("/new", newRouter);

// Keep error handling middleware at the end
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
