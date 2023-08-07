import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import CustomError from "../utils/CustomError.js";

export async function register({ username, password }) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ username, password: hashedPassword });
  return user;
}

export async function login({ username, password }) {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new CustomError("Username or password are invalid", 400);
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new CustomError("Username or password are invalid", 400);
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
}