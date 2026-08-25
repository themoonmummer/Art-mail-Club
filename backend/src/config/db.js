const mysql = require("mysql2/promise");
require("dotenv").config();

// A connection pool is used instead of a single connection so the
// backend can serve multiple requests at once without waiting.
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "art_mail_club",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
