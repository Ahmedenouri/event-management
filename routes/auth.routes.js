const express = require("express");
const router = express.Router();

// Page login
router.get("/login", (req, res) => {
  res.render("pages/login", { error: null });
});

// Traitement login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    req.session.user = { username };
    return res.redirect("/dashboard");
  }

  res.render("pages/login", { error: "Identifiants incorrects" });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
