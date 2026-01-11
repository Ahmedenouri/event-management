const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ahmedenouri7:mongodbevents@cluster0.5cv3qwn.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connecté");
  } catch (error) {
    console.error("Erreur MongoDB :", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
