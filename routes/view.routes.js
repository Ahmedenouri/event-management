const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth.middleware");
const { getDashboard } = require("../controllers/dashboard.controller");

router.get("/", (req, res) => {
  res.redirect("/login");
});

// Dashboard protégé
router.get("/dashboard", isAuthenticated, getDashboard);

module.exports = router;
