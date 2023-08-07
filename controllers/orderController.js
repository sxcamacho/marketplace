import * as orderService from "../services/orderService.js";

export async function getOrders(req, res) {
  const orders = await orderService.getAllOrders();
  return res.status(200).json(orders);
}

export async function getOrderById(req, res) {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  if (!order) {
    throw new CustomError("Order not found", 404);
  }
  return res.status(200).json(order);
}

export async function createOrder(req, res) {
  const { userId } = req.user.userId;
  const { price, amount } = req.body;
  const order = await orderService.createOrder({
    makerId: userId,
    price,
    amount,
  });
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.status(200).json(order);
}

export async function getBidsByOrderId(req, res) {
  const { id } = req.params;
  const bids = await orderService.getBidsByOrderId(id);
  return res.status(200).json(bids);
}

export async function createOrderBid(req, res) {
  const { id } = req.params;
  const { price } = req.body;
  const orderBid = await orderService.createOrderBid({
    orderId: id,
    takerId: req.user.userId,
    price,
  });
  return res.status(201).json(orderBid);
}

export async function acceptOrderBid(req, res) {
  const { id, bidId } = req.params;
  const { userId } = req.user;
  const bid = await orderService.acceptOrderBid({ orderId: id, bidId, userId });
  return res.status(200).json(bid);
}
