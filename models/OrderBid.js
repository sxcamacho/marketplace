import { sequelize, Sequelize } from "./index.js";
import User from "./User.js";
import Order from "./Order.js";

const OrderBid = sequelize.define("OrderBid", {
  takerId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  price: Sequelize.DECIMAL,
  expiresAt: Sequelize.DATE,
  acceptedAt: Sequelize.DATE,
  createdNotificationSentAt: Sequelize.DATE,
  acceptedNotificationSentAt: Sequelize.DATE,
});

OrderBid.belongsTo(User, { foreignKey: "takerId", as: "taker" });
OrderBid.belongsTo(Order, { foreignKey: "orderId", as: "order" });

export default OrderBid;
