require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./src/routes/auth.routes");
const profileRoutes = require("./src/routes/profile.routes");
const contactRoutes = require("./src/routes/contact.routes");
const communityRoutes = require("./src/routes/community.routes");
const productsRoutes = require("./src/routes/products.routes");
const subscriptionsRoutes = require("./src/routes/subscriptions.routes");
const ordersRoutes = require("./src/routes/orders.routes");
const uploadRoutes = require("./src/routes/upload.routes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// Uploaded product/post images are served as static files, e.g.
// http://localhost:5000/uploads/171234-photo.jpg
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/upload", uploadRoutes);

// Fallback error handler (e.g. multer file-type errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Something went wrong." });
});
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Art Mail Club API running on http://localhost:${PORT}`);
  });
}
