const Event = require("../models/Event");

// GET /events
const getAllEvents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // page actuelle
    const limit = 5; // événements par page
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const sort = req.query.sort || "date";

    // filtre recherche
    const filter = {
      title: { $regex: search, $options: "i" },
    };

    // données
    const events = await Event.find(filter)
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(limit);

    const totalEvents = await Event.countDocuments(filter);
    const totalPages = Math.ceil(totalEvents / limit);

    res.render("pages/events", {
      events,
      currentPage: page,
      totalPages,
      search,
      sort,
    });
  } catch (error) {
    next(error);
  }
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
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable" });
    }

    // Supprimer billets liés
    await Ticket.deleteMany({ event: eventId });

    // Supprimer événement
    await event.deleteOne();

    res.json({
      message: "Événement et billets associés supprimés avec succès",
    });
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

