import express from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
import * as orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.get("/:id/bids", orderController.getBidsByOrderId);
router.post("/", authenticationMiddleware, orderController.createOrder);
router.post(
  "/:id/bids",
  authenticationMiddleware,
  orderController.createOrderBid
);
router.put(
  "/:id/bids/:bidId/accept",
  authenticationMiddleware,
  orderController.acceptOrderBid
);

export default router;