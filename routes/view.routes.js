const express = require("express");
const isAuthenticated = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("pages/dashboard");
});


module.exports = router;
