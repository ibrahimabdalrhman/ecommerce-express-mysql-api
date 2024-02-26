const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const cartController = require("../controllers/cart");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Users management
 */

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: add  product into Cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               ProductId:
 *                 type: integer
 *                 description: The Id of the product
 *                 example: 1
 *               color:
 *                 type: string
 *                 description: The Id of the product
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 description: The Id of the product
 *                 example: 1
 *     responses:
 *       '201':
 *         description: A list of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.post('/', authController.protect, cartController.addToCart);

/**
 * @swagger
 * /api/v1/cart/deleteItemFromCart:
 *   post:
 *     summary: get   Cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               CartItemId:
 *                 type: integer
 *                 description: The Id of the product
 *                 example: 1
 *     responses:
 *       '200':
 *         description: A list of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.post('/deleteItemFromCart', authController.protect, cartController.deleteItemFromCart);

/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: delete product from Cart
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: A list of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.get('/', authController.protect, cartController.getCart);

/**
 * @swagger
 * /api/v1/cart:
 *   delete:
 *     summary: delete product from Cart
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: A list of Products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.delete('/', authController.protect, cartController.clearCart);





module.exports = router;
