import { sequelize, Sequelize } from "./index.js";

const User = sequelize.define("User", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

export default User;
