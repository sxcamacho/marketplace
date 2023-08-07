import * as userService from "../services/userService.js";
import * as orderService from "../services/orderService.js";

export async function me(req, res, next) {
  try {
    const { userId } = req.user;
    const user = await userService.getUserById(userId);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const { userId } = req.user;
    const orders = await orderService.getOrdersByUserId(userId);
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function getUserOrders(req, res, next) {
  try {
    const { id } = req.params;
    const orders = await orderService.getOrdersByUserId(id);
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}
