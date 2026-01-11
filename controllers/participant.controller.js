const Participant = require("../models/Participant");

// GET /participants
const getAllParticipants = async (req, res, next) => {
  try {
    const participants = await Participant.find().populate("events");
    res.json(participants);
  } catch (err) {
    next(err);
  }
};

// POST /participants
const createParticipant = async (req, res, next) => {
  try {
    // Vérifier doublon email
    const exists = await Participant.findOne({ email: req.body.email });
    if (exists) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const participant = new Participant(req.body);
    const savedParticipant = await participant.save();
    res.status(201).json(savedParticipant);
  } catch (err) {
    next(err);
  }
};

// PUT /participants/:id
const updateParticipant = async (req, res, next) => {
  try {
    const updatedParticipant = await Participant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedParticipant) return res.status(404).json({ message: "Participant non trouvé" });
    res.json(updatedParticipant);
  } catch (err) {
    next(err);
  }
};

// DELETE /participants/:id
const deleteParticipant = async (req, res, next) => {
  try {
    const deletedParticipant = await Participant.findByIdAndDelete(req.params.id);
    if (!deletedParticipant) return res.status(404).json({ message: "Participant non trouvé" });
    res.json({ message: "Participant supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
};
