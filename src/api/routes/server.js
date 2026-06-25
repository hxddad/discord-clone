import express from "express";
import Server from "../../models/Server.js";
import authMiddleware from "../middleware.js";

const router = express.Router();

// create a new server
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Server name is required" });
    }

    const server = await Server.create({
      name,
      owner: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(server);
  } catch (error) {
    res.status(500).json({ message: "Failed to create server" });
  }
});

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

// get a specific server by ID for the authenticated user

router.get("/:serverId", authMiddleware, async (req, res) => {
  try {
    const server = await Server.findOne({
      _id: req.params.serverId,
      members: req.user.id,
    });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    res.json(server);
  } catch (error) {
    res.status(500).json({ message: "Failed to get server" });
  }
});

export default router;