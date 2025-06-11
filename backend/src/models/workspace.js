const mongoose = require("mongoose");
const workspaceSchema = new mongoose.Schema(
  {
    message: {
      type: Object,
      required: true,
      validate: {
        validator: function (value) {
          // Validate it must have a "prompt" and "type"
          return (
            typeof value === "object" &&
            value !== null &&
            typeof value.prompt === "string" &&
            typeof value.type === "string"
          );
        },
        message: "Message must be an object with valid prompt and type fields.",
      },
    },

    fileData: {
      type: Object,
      required: false,
      validate: {
        validator: function (value) {
          // Optional but if exists
          if (!value) return true;
          return (
            typeof value === "object" &&
            typeof value.name === "string" &&
            typeof value.size === "number" &&
            typeof value.type === "string"
          );
        },
        message:
          "FileData must include name (string), size (number), and type (string).",
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const WorkSpace = mongoose.model("Workspace", workspaceSchema);
module.exports = WorkSpace;
