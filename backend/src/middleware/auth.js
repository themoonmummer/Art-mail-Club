const jwt = require("jsonwebtoken");
require("dotenv").config();

// Reads the "Authorization: Bearer <token>" header, verifies it, and
// attaches { id, username, email } to req.user. Used on any route
// that needs to know who is logged in.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "You must be logged in." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Session expired. Please log in again." });
  }
}

// Same as requireAuth, but does NOT fail if there's no token — it just
// leaves req.user as null. Useful for routes like "list products" that
// work for guests but behave slightly differently for logged-in users.
function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    req.user = null;
  }

  next();
}

module.exports = { requireAuth, optionalAuth };
