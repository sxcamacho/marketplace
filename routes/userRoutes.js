import express from "express";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /users/me:
 *  get:
 *    tags: 
 *      - Users
 *    summary: Get the logged in user
 *    description: Returns the user object of the currently authenticated user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                username:
 *                  type: string
 *      '401':
 *        description: Unauthorized. Missing or invalid authentication token.
 *      '500':
 *        description: Internal server error.
 */
router.get("/me", authenticationMiddleware, userController.me);
/**
 * @swagger
 * /users/me/orders:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     description: Get orders for the authenticated user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/me/orders", authenticationMiddleware, userController.getMyOrders);
/**
 * @swagger
 * /users/{id}/orders:
 *   get:
 *     tags:
 *       - Users
 *     description: Get orders for a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get the orders
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id/orders", userController.getUserOrders);

export default router;
