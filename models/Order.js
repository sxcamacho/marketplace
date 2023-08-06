import { sequelize, Sequelize } from "./index.js";
import User from "./User.js";

const Order = sequelize.define("Order", {
  makerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  startAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endsAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  canceledAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

User.hasMany(Order, { foreignKey: "makerId" });
Order.belongsTo(User, { foreignKey: "makerId" });

export default Order;
