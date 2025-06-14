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
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: {},
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
