const mongoose = require("mongoose");
const { Schema } = mongoose;

const Message = mongoose.model("Message", { message: String });
module.exports = Message;
