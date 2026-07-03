import express from "express";
import Server from "../../models/Server.js";
import authMiddleware from "../middleware.js";
import { ServerClosedEvent } from "mongodb";

const router = express.Router();


// get all servers for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const servers = await Server.find({
      members: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(servers);
  } catch (error) {
    res.status(500).json({ message: "Failed to get servers" });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const server = await Server.findById(req.params._id);

    if (!server) {
      console.log("Server switch failed: not found", req.params._id);
      return res.status(404).json({ message: "Server not found" });
    }

    console.log("Server switched to:", server.name);

    return res.json(server);
  } catch (err) {
    console.log("Server switch error:", err.message);
    return res.status(500).json({ message: err.message });
  }
});

export default router;