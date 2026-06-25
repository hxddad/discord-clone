import express from "express";
import cors from "cors";
import env from "dotenv";
import authRoutes from "./api/routes/auth.js";
import serverRoutes from "./api/routes/server.js";
import mongoose from "mongoose";
import { createServer } from 'node:http';
import { setServers } from "dns";
import { Server } from "socket.io";


setServers(['8.8.8.8', '1.1.1.1']);

env.config();

const app = express();

const server = createServer(app); 

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send-message", (message, callback) => {
    console.log("Message received:", message);

    io.emit("receive-message", message);

    if (callback) {
      callback({ status: "ok" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
// port 4000 socket server
server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/servers", serverRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      
      const server = createServer(app);
      server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
} else {
  console.log("Test env detected — skipping automatic MongoDB connect. Tests should manage the DB connection.");
}

export default app;