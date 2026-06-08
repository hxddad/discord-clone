import express from "express";
import cors from "cors";
import env from "dotenv";
import authRoutes from "./api/auth.js";
import mongoose from "mongoose";
import { createServer } from 'node:http';
import { setServers } from "dns";
import { Server } from 'socket.io';

setServers(['8.8.8.8', '1.1.1.1']);

env.config();

const app = express();
const server = createServer(app);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");

      server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
} else {
  console.log("Test env detected — skipping automatic MongoDB connect. Tests should manage the DB connection.");
}

export default app;