const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },

    from: { type: String },

    to: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
