const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: authorization(signup and login )
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the user
 *                 example: Sample user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: Sample@gmail.com
 *               username:
 *                 type: string
 *                 description: The user of the user
 *                 example: Sample user
 *               phone:
 *                 type: string
 *                 description: The phone of the user
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "**********"
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '201':
 *         description: signup User
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */
router.post("/signup", authController.signup);
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login by email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The title of the user
 *                 example: Sampl@gmail.com
 *               password:
 *                 type: string
 *                 description: The title of the user
 *                 example: "**********"
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/v1/auth/profileImage:
 *   patch:
 *     summary: update your profile image
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImage:
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the category (file upload)
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       '200':
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
router.patch("/profileImage",authController.protect ,authController.profileImage);


module.exports = router;
