const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      }),
    });
    console.log(token);
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
        message: "Incorrect username or password",
        status: false,
      });
    }
    const isPasswordValide = await bcrypt.compare(password, user.password);
    if (!isPasswordValide) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }
    delete user.password;
    res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.getusers = async (req, res, next) => {
  const allUsers = await User.find();
  try {
    if (allUsers) {
      res.json({ status: true, allUsers });
    }
  } catch (error) {
    next(error);
  }
};
