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

// PUT /speakers/:id
const updateSpeaker = async (req, res, next) => {
  try {
    const updatedSpeaker = await Speaker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSpeaker) return res.status(404).json({ message: "Conférencier non trouvé" });
    res.json(updatedSpeaker);
  } catch (err) {
    next(err);
  }
};

// DELETE /speakers/:id
const deleteSpeaker = async (req, res, next) => {
  try {
    const deletedSpeaker = await Speaker.findByIdAndDelete(req.params.id);
    if (!deletedSpeaker) return res.status(404).json({ message: "Conférencier non trouvé" });
    res.json({ message: "Conférencier supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
};
