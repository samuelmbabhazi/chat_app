const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

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
});
userSchema.pre("save", function (next) {
  this.username =
    this.username.trim()[0].toUpperCase() +
    this.username.slice(1).toLowerCase();
  next();
});

userSchema.plugin(uniqueValidator);

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
