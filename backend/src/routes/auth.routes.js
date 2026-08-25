const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function publicUser(row) {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    bio: row.bio,
    profilePicture: row.profile_picture,
    createdAt: row.created_at,
  };
}

// POST /api/auth/signup
// Matches the "Create your account" form on Profile.jsx
// (username, email, password).
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Username, email and password are all required." });
    }

    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email.trim(), username.trim()]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "That username or email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username.trim(), email.trim(), passwordHash]
    );

    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [result.insertId]);
    const user = rows[0];

    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create account." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email.trim()]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not log in." });
  }
});

// GET /api/auth/me — used on page load to check "am I logged in?"
router.get("/me", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [req.user.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ user: publicUser(rows[0]) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load account." });
  }
});

// POST /api/auth/logout
// JWTs are stateless, so "logout" just means the frontend deletes the
// token it stored. This route exists so the frontend has something to
// call and so it's easy to swap in real token invalidation later.
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out." });
});

module.exports = router;
