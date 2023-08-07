import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import orderRoutes from "./routes/orderRoutes.js";
import { sequelize } from "./models/index.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";

const SERVER_PORT = 3001;

async function start() {
  try {
    config();

    await sequelize.sync();

    const app = express();

    app.use(express.json());
    app.use("/auth", authRoutes);
    app.use("/users", usersRoutes);
    app.use("/orders", orderRoutes);

    app.use(errorHandlingMiddleware);
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on port ${SERVER_PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
}

start();
