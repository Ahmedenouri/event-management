const Event = require("../models/Event");

// GET /events
const getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// POST /events
const createEvent = async (req, res) => {
  const event = new Event(req.body);
  const savedEvent = await event.save();
  res.status(201).json(savedEvent);
};


// PUT /events/:id
const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: "Événement non trouvé" });
    res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

// DELETE /events/:id
const deleteEvent = async (req, res, next) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Événement non trouvé" });
    res.json({ message: "Événement supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};

// GET /events/:id/participants-count
const getParticipantsCount = async (req, res, next) => {
  try {
    const count = await Ticket.countDocuments({ event: req.params.id });
    res.json({ eventId: req.params.id, participantsCount: count });
  } catch (err) {
    next(err);
  }
};

// GET /events/search?room=...&speaker=...&date=...
const searchEvents = async (req, res, next) => {
  try {
    const { room, speaker, date } = req.query;
    let filter = {};

    if (room) filter.room = room;
    if (speaker) filter.speakers = speaker;
    if (date) filter.date = new Date(date);

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getParticipantsCount,
  searchEvents,
};

