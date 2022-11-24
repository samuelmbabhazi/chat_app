const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },

    from: { type: mongoose.Types.ObjectId },

    to: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
