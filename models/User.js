import Sequelize from "sequelize";
import db from "./index.js";

const User = db.sequelize.define("User", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
});

export default User;
