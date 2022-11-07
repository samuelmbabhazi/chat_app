const User = require("../model/usermodel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
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
    res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await User.findOne({ username });

    if (!users) {
      return res.json({
        message: "Incorrect username or password",
        status: false,
      });
    }
    const isPasswordValide = await bcrypt.hash.compare(password, user.password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
    delete user.password;
    res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
