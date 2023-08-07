import { Sequelize } from "../models/index.js";
import Order from "../models/order.js";
import OrderBid from "../models/orderBid.js";
import CustomError from "../utils/CustomError.js";
import moment from "moment";

export async function getAllOrders() {
  return await Order.findAll();
}

export async function getOrderById(id) {
  const order = await Order.findByPk(id);
  if (!order) {
    throw new CustomError("Order not found", 404);
  }
  return order;
}

export async function getOrdersByUserId(userId) {
  return await Order.findAll({ where: { makerId: userId } });
}

export async function createOrder({ makerId, price, amount }) {
  const startAt = moment();
  const durationDays = 3;
  return await Order.create({
    makerId,
    price,
    amount,
    startAt: startAt.format("YYYY-MM-DD HH:mm:ss"),
    endsAt: startAt.add(durationDays, "days").format("YYYY-MM-DD HH:mm:ss"),
  });
}

export async function getBidsByOrderId(orderId) {
  return await OrderBid.findAll({ where: { orderId } });
}

export async function createOrderBid({ orderId, takerId, price }) {
  const order = await getOrderById(orderId);
  if (moment(order.endsAt).isSameOrBefore(moment())) {
    throw new CustomError("The order is no longer available", 400);
  }
  const durationDays = 3;
  return await OrderBid.create({
    orderId,
    takerId,
    price,
    expiresAt: moment().add(durationDays, "days").format("YYYY-MM-DD HH:mm:ss"),
  });
}

export async function acceptOrderBid({ orderId, bidId, userId }) {
  const order = await getOrderById(orderId);
  if (order.makerId !== userId) {
    throw new CustomError("User unauthorized to accept this bid", 403);
  }
  const bid = await OrderBid.findByPk(bidId);
  if (!bid) {
    throw new CustomError("Bid not found", 404);
  }
  if (bid.acceptedAt) {
    throw new CustomError("Bid has already been accepted", 400);
  }
  if (moment(bid.expiresAt).isSameOrBefore(moment())) {
    throw new CustomError("Bid has already expired", 400);
  }
  const acceptedBid = await OrderBid.findOne({
    where: {
      orderId,
      acceptedAt: {
        [Sequelize.Op.ne]: null,
      },
      expiresAt: {
        [Sequelize.Op.gt]: moment().date(),
      },
    },
  });
  if (acceptedBid && acceptedBid.id !== bid.id) {
    throw new CustomError(
      "The offer cannot be accepted because there is already another offer accepted that has not expired.",
      400
    );
  }
  bid.acceptedAt = moment().format("YYYY-MM-DD HH:mm:ss");
  await bid.save();
  return bid;
}
