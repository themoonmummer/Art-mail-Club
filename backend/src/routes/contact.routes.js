const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// POST /api/contact
// Matches the form in pages/Contact.jsx (name, email, message).
// The form currently has no onSubmit handler at all — this is the
// endpoint it should call instead of just doing a normal HTML submit.
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name, email and message are all required." });
    }

    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), message.trim()]
    );

    res.status(201).json({ message: "Thanks! Your message has been received." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not send your message." });
  }
});

module.exports = router;
