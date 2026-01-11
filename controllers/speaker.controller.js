const Speaker = require("../models/Speaker");

// GET /speakers
const getAllSpeakers = async (req, res, next) => {
  try {
    const speakers = await Speaker.find().populate("events");
    res.json(speakers);
  } catch (err) {
    next(err);
  }
};

// POST /speakers
const createSpeaker = async (req, res, next) => {
  try {
    const speaker = new Speaker(req.body);
    const savedSpeaker = await speaker.save();
    res.status(201).json(savedSpeaker);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSpeakers,
  createSpeaker,
};
