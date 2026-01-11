const express = require("express");
const app = express();
app.use(express.json());

const PORT = 3000;



const connectDB = require("./config/db");
const eventRoutes = require("./routes/event.routes");
const participantRoutes = require("./routes/participant.routes");
const speakerRoutes = require("./routes/speaker.routes");
const roomRoutes = require("./routes/room.routes");
const ticketRoutes = require("./routes/ticket.routes");




// connexion DB
connectDB();

app.use("/events", eventRoutes);
app.use("/participants", participantRoutes);
app.use("/speakers", speakerRoutes);
app.use("/rooms", roomRoutes);
app.use("/tickets", ticketRoutes);




// routes
app.get("/", (req, res) => {
  res.send("Bienvenue dans l'application de gestion d'événements 🎉");
});


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

const errorHandler = require("./middleware/errorHandler");

// ... tes routes ici ...

// Middleware gestion des erreurs (toujours à la fin)
app.use(errorHandler);
