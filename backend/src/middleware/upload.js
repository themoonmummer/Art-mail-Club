const multer = require("multer");
const path = require("path");

// The current frontend stores uploaded images as base64 data-URLs
// directly in localStorage. That does not scale to a real database
// (rows would become huge), so the backend instead accepts a normal
// file upload and returns a URL like /uploads/171234-photo.jpg that
// gets saved in the `image_url` column.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
