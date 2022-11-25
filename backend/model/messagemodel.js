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

const messageModel = mongoose.model("Messages", messageSchema);
module.exports = messageModel;
