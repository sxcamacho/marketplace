import * as authService from "../services/authService.js";

export async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const token = await authService.login(req.body);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}
