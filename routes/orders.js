import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import { Sequelize } from "../models/index.js";
import Order from "../models/Order.js";
import OrderBid from "../models/OrderBid.js";
import moment from "moment";

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.findAll({
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

router.get("/:id/bids", async (req, res) => {
  const { id } = req.params;
  const bids = await OrderBid.findAll(
    { where: { orderId: id } },
    { limit: 10 }
  );
  res.json(bids);
});

router.post("/:id/bids", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  try {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (moment(order.endsAt).isSameOrBefore(moment())) {
      return res
        .status(400)
        .json({ message: "The order is no longer available" });
    }

    const durationDays = 3;
    const orderBid = await OrderBid.create({
      orderId: id,
      takerId: req.user.userId,
      price,
      expiresAt: moment()
        .add(durationDays, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
    });

    return res.status(201).json(orderBid);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating bid", error: err.message });
  }
});

router.put("/:id/bids/:bidId/accept", authenticateToken, async (req, res) => {
  const { id, bidId } = req.params;
  const { userId } = req.user;

  const order = await Order.findByPk(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.makerId !== userId) {
    return res
      .status(403)
      .json({ message: "User unauthorized to accept this bid" });
  }

  const bid = await OrderBid.findByPk(bidId);

  if (!bid) {
    return res.status(404).json({ message: "Bid not found" });
  }

  if (bid.acceptedAt) {
    return res.status(400).json({ message: "Bid has already been accepted" });
  }

  if (moment(bid.expiresAt).isSameOrBefore(moment())) {
    return res.status(400).json({ message: "Bid has already expired" });
  }

  const acceptedBid = await OrderBid.findOne({
    where: {
      orderId: id,
      acceptedAt: {
        [Sequelize.Op.ne]: null, // acceptedAt is not null
      },
      expiresAt: {
        [Sequelize.Op.gt]: moment().date(), // expiresAt is greather than current date
      },
    },
  });

  if (acceptedBid && acceptedBid.id !== bid.id) {
    return res.status(400).json({
      message:
        "The offer cannot be accepted because there is already another offer accepted that has not expired.",
    });
  }

  bid.acceptedAt = moment().format("YYYY-MM-DD HH:mm:ss");
  await bid.save();

  res.json(bid);
});

export default router;
