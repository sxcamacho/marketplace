import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import db from "./models/index.js";

const SERVER_PORT = 3001;

async function start() {
  try {
    config();

    await db.sequelize.sync();

    const app = express();
    app.use(express.json());
    app.use("/auth", authRoutes);
    app.use("/users", usersRoutes);

    app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));
  } catch (err) {
    console.error(err);
  }
}

start();