const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/usersroute");
const { Server } = require("socket.io");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée ! :", err.message));

const server = app.listen(process.env.PORT, () => {
  console.log(`server actif au Port ${process.env.PORT}`);
});
const io = new Server(server, {
  cors: {
    origin: "https://chat-app-azure-ten.vercel.app",
    credentials: true,
    methods: ["GET", "POST"],
  },
});
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("connection a socket");
  socket.on("connected", (data) => {
    const { username } = data; // Donnees envoyer par le client lors de connected e
  });
  socket.on("send-msg", (data) => {
    const { message, from, to, date } = data;
    io.emit("msg-recieved", data);
  });
});
