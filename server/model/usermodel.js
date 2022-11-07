const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  isAvatarImgSet: {
    type: Boolean,
    default: false,
  },
  avatarImg: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
