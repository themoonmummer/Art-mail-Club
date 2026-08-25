const express = require("express");
const pool = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/products
// Matches the `products` array (DEFAULT_PRODUCTS + community posts)
// built in pages/Home.jsx.
router.get("/", async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.id, p.title, p.description, p.details, p.category,
              p.image_url, p.price, p.is_official, p.status, p.created_at,
              c.name AS theme,
              u.username AS seller_username, u.email AS seller_email
       FROM products p
       LEFT JOIN clubs c ON c.id = p.club_id
       LEFT JOIN users u ON u.id = p.seller_id
       WHERE p.status = 'active'
       ORDER BY p.created_at DESC`
    );

    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load products." });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const [[product]] = await pool.query(
      `SELECT p.*, c.name AS theme,
              u.username AS seller_username, u.email AS seller_email
       FROM products p
       LEFT JOIN clubs c ON c.id = p.club_id
       LEFT JOIN users u ON u.id = p.seller_id
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load product." });
  }
});

// POST /api/products
// Matches handleCreatePost() in Home.jsx / handleCreatePost() in
// Profile.jsx (title, description, details, price, category, image,
// club/theme).
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, description, details, category, imageUrl, price, clubId } = req.body;

    if (!title?.trim() || !description?.trim() || !price) {
      return res.status(400).json({ error: "Title, description and price are required." });
    }

    const [result] = await pool.query(
      `INSERT INTO products
         (seller_id, title, description, details, category, image_url, price, club_id, is_official)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, FALSE)`,
      [
        req.user.id,
        title.trim(),
        description.trim(),
        details?.trim() || null,
        category?.trim() || "Community Market",
        imageUrl || null,
        price,
        clubId || null,
      ]
    );

    res.status(201).json({ id: result.insertId, message: "Product listed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create product." });
  }
});

// DELETE /api/products/:id — only the seller can remove their own listing.
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const [[product]] = await pool.query(
      "SELECT seller_id FROM products WHERE id = ?",
      [req.params.id]
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    if (product.seller_id !== req.user.id) {
      return res.status(403).json({ error: "You can only remove your own listings." });
    }

    await pool.query("UPDATE products SET status = 'removed' WHERE id = ?", [req.params.id]);
    res.json({ message: "Product removed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not remove product." });
  }
});

module.exports = router;
