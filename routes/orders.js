import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import Order from "../models/Order.js";
import OrderBid from "../models/OrderBid.js";
import moment from "moment";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const orders = await Order.findAll({
    // where: {
    //   makerId: req.user.id
    // }
    limit: 10,
  });
  res.json(orders);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching order", error: err.message });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { price, amount } = req.body;
    const startAt = moment();
    const durationDays = 3;
    const newOrder = await Order.create({
      makerId: req.user.userId,
      price,
      amount,
      startAt: startAt.format("YYYY-MM-DD HH:mm:ss"),
      endsAt: startAt.add(durationDays, "days").format("YYYY-MM-DD HH:mm:ss"),
    });
    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/bids", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const durationDays = 3;
    const orderBid = await OrderBid.create({
      orderId: id,
      takerId: req.user.userId,
      price,
      expiresAt: moment().add(durationDays, "days").format("YYYY-MM-DD HH:mm:ss"),
    });

    return res.status(201).json(orderBid);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating order bid", error: err.message });
  }
});

export default router;
