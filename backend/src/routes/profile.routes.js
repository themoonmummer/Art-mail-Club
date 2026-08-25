const express = require("express");
const pool = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/profile
// Returns everything the Profile page needs in one call:
// account info, joined themes, posts, purchase history, subscription.
// This mirrors getFreshAccount() in pages/Profile.jsx.
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [[user]] = await pool.query(
      "SELECT id, username, email, bio, profile_picture, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const [joinedThemes] = await pool.query(
      `SELECT c.id, c.name, c.description
       FROM clubs c
       JOIN club_members cm ON cm.club_id = c.id
       WHERE cm.user_id = ?`,
      [userId]
    );

    const [posts] = await pool.query(
      `SELECT p.*, c.name AS club_name
       FROM products p
       LEFT JOIN clubs c ON c.id = p.club_id
       WHERE p.seller_id = ?
       ORDER BY p.created_at DESC`,
      [userId]
    );

    const [purchases] = await pool.query(
      `SELECT o.*, pr.title AS product_title, pr.image_url
       FROM orders o
       JOIN products pr ON pr.id = o.product_id
       WHERE o.buyer_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    const [[subscription]] = await pool.query(
      `SELECT us.*, sp.title, sp.plan_code, sp.price
       FROM user_subscriptions us
       JOIN subscription_plans sp ON sp.id = us.plan_id
       WHERE us.user_id = ? AND us.status = 'active'
       ORDER BY us.start_date DESC
       LIMIT 1`,
      [userId]
    );

    res.json({
      user,
      joinedThemes,
      posts,
      purchases,
      subscription: subscription || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load profile." });
  }
});

// PUT /api/profile
// Matches the Settings tab (username, email, bio, profile picture URL).
router.put("/", requireAuth, async (req, res) => {
  try {
    const { username, email, bio, profilePicture } = req.body;

    if (!username?.trim() || !email?.trim()) {
      return res.status(400).json({ error: "Username and email are required." });
    }

    await pool.query(
      "UPDATE users SET username = ?, email = ?, bio = ?, profile_picture = ? WHERE id = ?",
      [username.trim(), email.trim(), bio || null, profilePicture || null, req.user.id]
    );

    const [[updated]] = await pool.query(
      "SELECT id, username, email, bio, profile_picture FROM users WHERE id = ?",
      [req.user.id]
    );

    res.json({ user: updated });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "That username or email is already taken." });
    }
    res.status(500).json({ error: "Could not update profile." });
  }
});

module.exports = router;
