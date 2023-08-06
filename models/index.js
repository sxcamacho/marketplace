import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Sequelize from "sequelize";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const configEnv = config[env];
const db = {};

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

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(async (file) => {
    const model = await import(path.join(__dirname, file));
    db[model.default.name] = model.default;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
