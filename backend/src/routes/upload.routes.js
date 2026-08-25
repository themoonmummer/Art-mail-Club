const express = require("express");
const upload = require("../middleware/upload");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// POST /api/upload  (multipart/form-data, field name: "image")
// Used by the "Create a Post" image upload in Home.jsx / Profile.jsx.
// Returns a URL to save in products.image_url instead of storing a
// giant base64 string in the database.
router.post("/", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file received." });
  }

  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

module.exports = router;
