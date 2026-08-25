const express = require("express");
const pool = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/subscriptions/plans
// Matches the THEMES array in pages/Subscription.jsx.
router.get("/plans", async (req, res) => {
  try {
    const [plans] = await pool.query("SELECT * FROM subscription_plans ORDER BY id ASC");
    res.json({ plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load subscription plans." });
  }
});

// GET /api/subscriptions/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const [[subscription]] = await pool.query(
      `SELECT us.*, sp.title, sp.plan_code, sp.price
       FROM user_subscriptions us
       JOIN subscription_plans sp ON sp.id = us.plan_id
       WHERE us.user_id = ? AND us.status = 'active'
       ORDER BY us.start_date DESC
       LIMIT 1`,
      [req.user.id]
    );

    res.json({ subscription: subscription || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load subscription." });
  }
});

// POST /api/subscriptions/subscribe
// Matches handleSubscribe() in pages/Subscription.jsx. This is a DEMO
// subscription flow: no real recurring billing, the plan is simply
// marked active immediately after a fake payment step.
// Body: { planCode: 'autumn' | 'rain' | 'greenery' | 'sunny', card details (all fake) }
router.post("/subscribe", requireAuth, async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { planCode, cardNumber } = req.body;

    if (!planCode) {
      return res.status(400).json({ error: "planCode is required." });
    }

    const [[plan]] = await connection.query(
      "SELECT * FROM subscription_plans WHERE plan_code = ?",
      [planCode]
    );

    if (!plan) {
      return res.status(404).json({ error: "Subscription plan not found." });
    }

    await connection.beginTransaction();

    // Any previous active subscription is marked cancelled — a user
    // has one active plan at a time, matching the frontend's single
    // account.subscription object.
    await connection.query(
      "UPDATE user_subscriptions SET status = 'cancelled', end_date = NOW() WHERE user_id = ? AND status = 'active'",
      [req.user.id]
    );

    const [subResult] = await connection.query(
      "INSERT INTO user_subscriptions (user_id, plan_id, status) VALUES (?, ?, 'active')",
      [req.user.id, plan.id]
    );

    // Also join the matching community club, mirroring the frontend's
    // "joinedThemes" behaviour when a subscription is created.
    const [[matchingClub]] = await connection.query(
      "SELECT id FROM clubs WHERE name = ?",
      [plan.title]
    );
    if (matchingClub) {
      await connection.query(
        "INSERT IGNORE INTO club_members (user_id, club_id) VALUES (?, ?)",
        [req.user.id, matchingClub.id]
      );
    }

    const maskedCard = cardNumber
      ? `**** **** **** ${String(cardNumber).replace(/\D/g, "").slice(-4)}`
      : null;
    const transactionRef = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    await connection.query(
      `INSERT INTO payments (user_subscription_id, amount, method, masked_card, status, transaction_ref)
       VALUES (?, ?, 'demo_card', ?, 'success', ?)`,
      [subResult.insertId, plan.price, maskedCard, transactionRef]
    );

    await connection.commit();

    res.status(201).json({
      message: "Subscribed successfully.",
      subscription: { id: subResult.insertId, plan: plan.title, status: "active" },
      transactionRef,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: "Could not process subscription." });
  } finally {
    connection.release();
  }
});

// POST /api/subscriptions/cancel
router.post("/cancel", requireAuth, async (req, res) => {
  try {
    await pool.query(
      "UPDATE user_subscriptions SET status = 'cancelled', end_date = NOW() WHERE user_id = ? AND status = 'active'",
      [req.user.id]
    );
    res.json({ message: "Subscription cancelled." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not cancel subscription." });
  }
});

module.exports = router;
