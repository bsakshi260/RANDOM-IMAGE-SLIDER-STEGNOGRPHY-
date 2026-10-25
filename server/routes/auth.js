const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");

const router = express.Router();

function createToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const cleanUsername = typeof username === "string" ? username.trim() : "";

    if (!cleanUsername || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    if (cleanUsername.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const existingUser = await User.findOne({ username: cleanUsername });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username: cleanUsername,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Registration successful.",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }

    return res.status(500).json({
      message: "Server error during registration.",
    });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const cleanUsername = typeof username === "string" ? username.trim() : "";

    if (!cleanUsername || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const user = await User.findOne({ username: cleanUsername });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const token = createToken(user);

    return res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error during login.",
    });
  }
});

module.exports = router;
