const express = require("express");
const router = express.Router();

const {
  getAllTickets,
  createTicket,
  deleteTicket
} = require("../controllers/ticket.controller");

// GET /tickets
router.get("/", getAllTickets);

// POST /tickets
router.post("/", createTicket);
// DELETE /tickets/:id
router.delete("/:id", deleteTicket);


module.exports = router;
