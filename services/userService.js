import User from "../models/user.js";

export async function getUserById(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  return user;
}