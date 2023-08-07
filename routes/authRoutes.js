import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Register a new user in the system. Returns the created user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               username: user1
 *               password: password123
 *     responses:
 *       201:
 *         description: The user was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID.
 *                 username:
 *                   type: string
 *                   description: The created user's username.
 *             example:
 *               username: user1
 *               password: password123
 *       500:
 *         description: There was an error on the server.
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login a user
 *     description: Login a user in the system. Returns a bearer token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               username: user1
 *               password: password123
 *     responses:
 *       200:
 *         description: The user was successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The bearer token for the authenticated session.
 *             example:
 *               token: bearer_token_value
 *       401:
 *         description: Username or password are invalid.
 *       500:
 *         description: There was an error on the server.
 */
router.post("/login", authController.login);

export default router;
