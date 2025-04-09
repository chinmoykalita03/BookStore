const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid credentials" });
    res.json({ token: generateToken(user._id) });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};
