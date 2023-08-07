import { sequelize, Sequelize } from "./index.js";

class User extends Sequelize.Model {
  toJSON() {
    const attributes = { ...this.get() };
    delete attributes.password;
    return attributes;
  }
}

User.init(
  {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  { sequelize }
);

export default User;
