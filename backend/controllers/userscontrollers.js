const User = require("../model/usermodel");
const Messages = require("../model/messagemodel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

//controller signup
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck) {
      return res.json({ message: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({ message: "Email already used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    delete user.password;
    // res.json({ status: true, user });
    res.json({
      status: true,
      userId: user._id,
    });
  } catch (err) {
    next(err);
  }
};

//controllers login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "Incorrect username or password1",
        status: false,
      });
    }
    const isPasswordValide = await bcrypt.compare(password, user.password);
    if (!isPasswordValide) {
      return res.json({
        message: "Incorrect username or password2",
        status: false,
      });
    }

    delete user.password;
    return res.json({
      user: user.username,
      userId: user._id,
      token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "30d",
      }),
    });
  } catch (err) {
    next(err);
  }
};

//controlleur getusers
module.exports.getusers = async (req, res, next) => {
  const allUsers = await User.find().sort({ username: 1 });
  try {
    if (allUsers) {
      res.json({ status: true, allUsers });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getmesssages = async (req, res, next) => {
  const messages = await Messages.find({
    $or: [
      { from: new mongoose.Types.ObjectId(req.params.currentId) },
      { to: new mongoose.Types.ObjectId(req.params.currentId) },
    ],
  })
    .sort({ updateAt: 1 })
    .exec();
  try {
    if (messages) {
      res.json({ status: true, messages });
    }
  } catch (error) {
    next(error);
  }
};
module.exports.postmesssages = async (req, res, next) => {
  var message = new Messages(req.body);
  message.save({
    message: message,
  });
  res.json({ message: message });
};
