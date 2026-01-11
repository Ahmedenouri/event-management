const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Participant",
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  price: Number,
});

module.exports = mongoose.model("Ticket", ticketSchema);
