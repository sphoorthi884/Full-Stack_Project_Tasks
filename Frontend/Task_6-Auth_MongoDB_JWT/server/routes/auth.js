const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hash });
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password!" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "JWT_SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// PROTECTED ROUTE
router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "JWT_SECRET_KEY", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    res.json({ message: "Protected content", user });
  });
});

module.exports = router;
