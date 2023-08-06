import Sequelize from "sequelize";
import config from "../config/config.js";

const env = process.env.NODE_ENV || "development";
const configEnv = config[env];

let sequelize;
if (configEnv.use_env_variable) {
  sequelize = new Sequelize(process.env[configEnv.use_env_variable], configEnv);
} else {
  sequelize = new Sequelize(
    configEnv.database,
    configEnv.username,
    configEnv.password,
    configEnv
  );
}

export {
  sequelize,
  Sequelize
}