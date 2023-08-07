import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { sequelize } from "./models/index.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// TODO: USE ENV VARIABLES OR CONFIG FILE
const SERVER_PORT = 3001;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;

const swaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Marketplace API with Swagger",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: SERVER_URL,
      },
    ],
  },
  apis: ["./routes/*.js"], //path to the files where you've defined your endpoints
};

async function start() {
  try {
    config();

    await sequelize.sync();

    const specs = swaggerJsdoc(swaggerJsdocOptions);
    const app = express();

    app.use(express.json());
    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
    app.use("/orders", orderRoutes);
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, { explorer: true })
    );

    app.use(errorHandlingMiddleware);
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on port ${SERVER_PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
}

start();
