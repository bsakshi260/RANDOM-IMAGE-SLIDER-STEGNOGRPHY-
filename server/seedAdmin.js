const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./model/User.js");

dotenv.config();

async function seedAdmin() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in server/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const username = "admin";
  const password = "admin123";

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    console.log("Admin user already exists.");
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      password: hashedPassword,
    });

    console.log("Demo admin created.");
    console.log("Username: admin");
    console.log("Password: admin123");
  }

  await mongoose.disconnect();
}

seedAdmin().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
