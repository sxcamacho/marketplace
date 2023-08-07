import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ username, password: hashedPassword });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password are invalid" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ message: "Username or password are invalid" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
