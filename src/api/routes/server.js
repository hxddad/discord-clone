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

router.get("/:id", async (req, res) => {
    try {
        const server = await Server.findById(req.params.id);

        if (!server) {
            return res.status(404).json({ message: "Server not found" });
        }

        res.json(server);
        const res = await fetch(server)
        const server = await res.json();
        
        navigate(`/servers/${server._id}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;