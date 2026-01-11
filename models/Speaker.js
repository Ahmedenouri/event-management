const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

module.exports = mongoose.model("Speaker", speakerSchema);
