const mongoose = require("mongoose");
const workspaceSchema = new mongoose.Schema(
  {
    messages: {
      type: [
        {
          role: {
            type: String,
            enum: ["user", "ai"],
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
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
