const Event = require("../models/Event");
const Participant = require("../models/Participant");
const Ticket = require("../models/Ticket");

// Controller pour la page dashboard
const getDashboard = async (req, res, next) => {
  try {
    // Comptage total des entités
    const totalEvents = await Event.countDocuments();
    const totalParticipants = await Participant.countDocuments();
    const totalTickets = await Ticket.countDocuments();

    // Récupérer tous les événements pour le graphique
    const events = await Event.find();
    const eventNames = events.map(e => e.title); // noms pour labels du graphique

    // Compter participants par événement
    const participantCounts = [];
    for (let e of events) {
      // compter le nombre de tickets associés à chaque événement
      const count = await Ticket.countDocuments({ event: e._id });
      participantCounts.push(count);
    }

    // Vérification console (optionnel pour debug)
    console.log("Event Names:", eventNames);
    console.log("Participant Counts:", participantCounts);

    // Envoyer les données à EJS
    res.render("pages/dashboard", {
      totalEvents,
      totalParticipants,
      totalTickets,
      eventNames,
      participantCounts,
    });
  } catch (err) {
    console.error("Erreur Dashboard:", err);
    next(err); // envoie l'erreur à Express
  }
};

module.exports = { getDashboard };
