import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },

    from: { type: mongoose.Types.ObjectId, required: true },

    to: { type: mongoose.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("Messages", messageSchema);
module.exports = messageModel;
