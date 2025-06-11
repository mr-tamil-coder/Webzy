const express = require("express");
const Workspace = require("../models/workspace");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, fileData, user } = req.body;

    if (!message || !user) {
      return res.status(400).json({ error: "Missing message or user ID" });
    }

    const workspaceEntry = new Workspace({
      message,
      fileData,
      user,
    });

    const savedEntry = await workspaceEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    console.error("Error saving workspace:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
