const express = require("express");
const session = require("express-session");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 3000;

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




const connectDB = require("./config/db");
const eventRoutes = require("./routes/event.routes");
const participantRoutes = require("./routes/participant.routes");
const speakerRoutes = require("./routes/speaker.routes");
const roomRoutes = require("./routes/room.routes");
const ticketRoutes = require("./routes/ticket.routes");
const authRoutes = require("./routes/auth.routes");
const viewRoutes = require("./routes/view.routes");




// connexion DB
connectDB();

app.use("/events", eventRoutes);
app.use("/participants", participantRoutes);
app.use("/speakers", speakerRoutes);
app.use("/rooms", roomRoutes);
app.use("/tickets", ticketRoutes);

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRoutes);
app.use("/", viewRoutes);




// routes
app.get("/", (req, res) => {
  //res.send("Bienvenue dans l'application de gestion d'événements ");
  res.render('index')
});


app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

const errorHandler = require("./middleware/errorHandler");

// ... tes routes ici ...

// Middleware gestion des erreurs (toujours à la fin)
app.use(errorHandler);
