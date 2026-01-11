const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  room: String,
  speakers: [String],
  price: Number,
  capacity: Number,
});

module.exports = mongoose.model("Event", eventSchema);
