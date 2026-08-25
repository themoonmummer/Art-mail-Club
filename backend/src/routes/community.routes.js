const express = require("express");
const pool = require("../config/db");
const { requireAuth, optionalAuth } = require("../middleware/auth");

const router = express.Router();

/* =====================================================================
   CLUBS
===================================================================== */

// GET /api/community/clubs
// Matches src/data/communityData.js -> clubs[], used by
// DiscoverClubs.jsx and MyClubs.jsx.
router.get("/clubs", optionalAuth, async (req, res) => {
  try {
    const [clubs] = await pool.query("SELECT * FROM clubs ORDER BY id ASC");

    let joinedClubIds = [];

    if (req.user) {
      const [rows] = await pool.query(
        "SELECT club_id FROM club_members WHERE user_id = ?",
        [req.user.id]
      );
      joinedClubIds = rows.map((r) => r.club_id);
    }

    res.json({ clubs, joinedClubIds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load clubs." });
  }
});

// POST /api/community/clubs/:id/join
// Matches handleJoinClub() in pages/Community.jsx.
router.post("/clubs/:id/join", requireAuth, async (req, res) => {
  try {
    const clubId = req.params.id;

    const [[club]] = await pool.query("SELECT id FROM clubs WHERE id = ?", [clubId]);
    if (!club) {
      return res.status(404).json({ error: "Club not found." });
    }

    await pool.query(
      "INSERT IGNORE INTO club_members (user_id, club_id) VALUES (?, ?)",
      [req.user.id, clubId]
    );

    res.status(201).json({ message: "Joined club." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not join club." });
  }
});

/* =====================================================================
   POSTS
===================================================================== */

// GET /api/community/posts?clubId=1
// Matches communityPosts / visiblePosts in pages/Community.jsx.
router.get("/posts", optionalAuth, async (req, res) => {
  try {
    const { clubId } = req.query;

    let sql = `
      SELECT p.id, p.content, p.appreciates_count, p.created_at,
             p.club_id, u.username AS author,
             (SELECT COUNT(*) FROM post_replies r WHERE r.post_id = p.id) AS replies_count
      FROM community_posts p
      JOIN users u ON u.id = p.user_id
    `;
    const params = [];

    if (clubId) {
      sql += " WHERE p.club_id = ?";
      params.push(clubId);
    }

    sql += " ORDER BY p.created_at DESC";

    const [posts] = await pool.query(sql, params);
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load posts." });
  }
});

// POST /api/community/posts
// Matches handlePublishPost() in pages/Community.jsx.
router.post("/posts", requireAuth, async (req, res) => {
  try {
    const { content, clubId } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ error: "Post content is required." });
    }

    const [result] = await pool.query(
      "INSERT INTO community_posts (user_id, club_id, content) VALUES (?, ?, ?)",
      [req.user.id, clubId || null, content.trim()]
    );

    res.status(201).json({ id: result.insertId, message: "Post published." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not publish post." });
  }
});

// DELETE /api/community/posts/:id — only the post's own author can delete it.
router.delete("/posts/:id", requireAuth, async (req, res) => {
  try {
    const [[post]] = await pool.query(
      "SELECT user_id FROM community_posts WHERE id = ?",
      [req.params.id]
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.user_id !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own posts." });
    }

    await pool.query("DELETE FROM community_posts WHERE id = ?", [req.params.id]);
    res.json({ message: "Post deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not delete post." });
  }
});

// POST /api/community/posts/:id/reply
// Matches handleReply() in pages/Community.jsx.
router.post("/posts/:id/reply", requireAuth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ error: "Reply text is required." });
    }

    const [[post]] = await pool.query(
      "SELECT id FROM community_posts WHERE id = ?",
      [req.params.id]
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    await pool.query(
      "INSERT INTO post_replies (post_id, user_id, content) VALUES (?, ?, ?)",
      [req.params.id, req.user.id, content.trim()]
    );

    res.status(201).json({ message: "Reply added." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not add reply." });
  }
});

module.exports = router;
