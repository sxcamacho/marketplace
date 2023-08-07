import express from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/me", authenticationMiddleware, async (req, res) => {
  const { userId } = req.user;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  res.json(user);
});

router.get("/me/orders", authenticationMiddleware, async (req, res) => {
  const { userId } = req.user;

  try {
    const orders = await Order.findAll({ where: { makerId: userId } });
    return res.status(200).json(orders);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
});

router.get("/:id/orders", async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.findAll({ where: { makerId: id } });
    return res.status(200).json(orders);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
});

export default router;
