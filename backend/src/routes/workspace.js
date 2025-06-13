const express = require("express");
const Workspace = require("../models/workspace");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages, fileData, user } = req.body;

    if (!messages || !user) {
      return res.status(400).json({ error: "Missing message or user ID" });
    }

    const workspaceEntry = new Workspace({
      messages,
      fileData,
      user,
    });

    const savedEntry = await workspaceEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error("Error saving workspace:", error.messages);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Get workspace by ID
router.get("/:id", async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    res.json(workspace);
  } catch (error) {
    console.error("Error fetching workspace:", error.messages);

    // Handle invalid ID format (CastError)
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid workspace ID format" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all workspaces for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const workspaces = await Workspace.find({ user: req.params.userId });
    res.json(workspaces);
  } catch (error) {
    console.error("Error fetching user workspaces:", error.messages);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
