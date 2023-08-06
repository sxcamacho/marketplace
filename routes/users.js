import express from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import User from '../models/User.js';

const router = express.Router();

router.get("/me", authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.userId);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  res.json(user);
});

export default router;
