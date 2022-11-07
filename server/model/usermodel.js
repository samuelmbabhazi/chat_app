const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { schema } = mongoose;

const userSchema = new schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
UserSchema.methods.matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
