const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth.js");
const requireAuth = require("./middleware/auth.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Create server/.env from server/.env.example.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing. Create server/.env from server/.env.example.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Steganography authentication backend is running",
  });
});

app.use("/api/auth", authRoutes);

app.get("/api/auth/me", requireAuth, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
    },
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
