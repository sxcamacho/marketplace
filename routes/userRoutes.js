import express from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/me", authenticationMiddleware, userController.me);
router.get("/me/orders", authenticationMiddleware, userController.getMyOrders);
router.get("/:id/orders", userController.getUserOrders);

export default router;
