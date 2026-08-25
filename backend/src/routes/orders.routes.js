const express = require("express");
const pool = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const COMMISSION_PERCENT = Number(process.env.COMMISSION_PERCENT || 10);

// GET /api/orders/me — matches account.purchases in Profile.jsx ("History" tab).
router.get("/me", requireAuth, async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.*, p.title AS product_title, p.image_url
       FROM orders o
       JOIN products p ON p.id = o.product_id
       WHERE o.buyer_id = ?
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );

    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load orders." });
  }
});

// POST /api/orders/checkout
// Matches the full Buy -> Checkout -> Demo Payment -> Order Confirmed
// flow in Home.jsx's renderProductModal(). No real payment gateway —
// card details are validated for shape only and never stored raw.
//
// Body: {
//   productId,
//   shipping: { name, email, address, city, state, zip, country },
//   card: { number, expiry, cvv }
// }
router.post("/checkout", requireAuth, async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { productId, shipping = {}, card = {} } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "productId is required." });
    }

    const cardDigits = String(card.number || "").replace(/\D/g, "");
    if (cardDigits.length !== 16) {
      return res.status(400).json({ error: "Enter a valid 16-digit demo card number." });
    }

    const [[product]] = await connection.query(
      "SELECT * FROM products WHERE id = ? AND status = 'active'",
      [productId]
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found or no longer available." });
    }

    const itemPrice = Number(product.price);
    const commissionAmount = Number((itemPrice * (COMMISSION_PERCENT / 100)).toFixed(2));
    const sellerAmount = Number((itemPrice - commissionAmount).toFixed(2));
    const orderNumber = `AMC-${Math.floor(100000 + Math.random() * 900000)}`;

    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      `INSERT INTO orders
        (order_number, buyer_id, product_id, seller_id, item_price,
         commission_percent, commission_amount, seller_amount,
         shipping_name, shipping_email, shipping_address, shipping_city,
         shipping_state, shipping_zip, shipping_country, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'paid')`,
      [
        orderNumber,
        req.user.id,
        product.id,
        product.seller_id,
        itemPrice,
        COMMISSION_PERCENT,
        commissionAmount,
        sellerAmount,
        shipping.name || null,
        shipping.email || null,
        shipping.address || null,
        shipping.city || null,
        shipping.state || null,
        shipping.zip || null,
        shipping.country || null,
      ]
    );

    const maskedCard = `**** **** **** ${cardDigits.slice(-4)}`;
    const transactionRef = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    await connection.query(
      `INSERT INTO payments (order_id, amount, method, masked_card, status, transaction_ref)
       VALUES (?, ?, 'demo_card', ?, 'success', ?)`,
      [orderResult.insertId, itemPrice, maskedCard, transactionRef]
    );

    // A community-listed item is marked sold once purchased. Official
    // Art Mail Club catalog items (is_official = TRUE) stay active
    // since they represent restockable products, not one-offs.
    if (!product.is_official) {
      await connection.query("UPDATE products SET status = 'sold' WHERE id = ?", [product.id]);
    }

    await connection.commit();

    res.status(201).json({
      message: "Order placed.",
      orderNumber,
      commission: {
        percent: COMMISSION_PERCENT,
        commissionAmount,
        sellerAmount,
      },
      transactionRef,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: "Could not complete checkout." });
  } finally {
    connection.release();
  }
});

module.exports = router;
