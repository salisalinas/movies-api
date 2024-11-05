const express = require("express");
const router = express.Router();
const admin = require('../config/firebase-config');

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).json({ message: "User registered successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed. Please provide a valid token." });
  }
};
module.exports = router; 