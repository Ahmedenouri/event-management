const Ticket = require("../models/Ticket");
const Event = require("../models/Event");
const Participant = require("../models/Participant");

// GET /tickets
const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find()
      .populate("event")
      .populate("participant");
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

// POST /tickets (acheter un billet)
const createTicket = async (req, res, next) => {
  try {
    const { eventId, participantId } = req.body;

    // Vérifier que l'événement existe
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Événement non trouvé" });

    // Vérifier que le participant existe
    const participant = await Participant.findById(participantId);
    if (!participant) return res.status(404).json({ message: "Participant non trouvé" });

    // Empêcher billet en double
    const existingTicket = await Ticket.findOne({
      event: eventId,
      participant: participantId,
    });

    if (existingTicket) {
      return res
        .status(400)
        .json({ message: "Ce participant a déjà un billet" });
    }

    // Créer le billet
    const ticket = new Ticket({
      event: eventId,
      participant: participantId,
      price: event.price,
    });

    await ticket.save();

    // Ajouter événement au participant
    participant.events.push(eventId);
    await participant.save();

    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

// DELETE /tickets/:id
const deleteTicket = async (req, res, next) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    if (!deletedTicket) return res.status(404).json({ message: "Billet non trouvé" });
    res.json({ message: "Billet supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTickets,
  createTicket,
  deleteTicket,
};

