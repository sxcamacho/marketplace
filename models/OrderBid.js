import { sequelize, Sequelize } from "./index.js";
import User from "./user.js";
import Order from "./order.js";

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
  bidNotificationSentAt: Sequelize.DATE,
  acceptanceNotificationSentAt: Sequelize.DATE,
});

OrderBid.belongsTo(User, { foreignKey: "takerId", as: "taker" });
OrderBid.belongsTo(Order, { foreignKey: "orderId", as: "order" });

export default OrderBid;
