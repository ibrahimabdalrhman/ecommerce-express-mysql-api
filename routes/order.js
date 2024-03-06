const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const orderController = require("../controllers/order");

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: user orders
 */

/**
 * @swagger
 * /api/v1/order/{cartId}:
 *   post:
 *     summary: add  cart into order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID of the cart to add order
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: text
 *                 description: shipping Address
 *                 example: zamalek,cairo ,egypt
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

router.post('/:cartId', authController.protect, orderController.addOrder);

/**
 * @swagger
 * /api/v1/order/:
 *   get:
 *     summary: all orders
 *     tags: [Order]
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

router.get('/', authController.protect, orderController.getOrders);

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: get your Cart
 *     tags: [Order]
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

// router.get('/', authController.protect, cartController.getCart);

/**
 * @swagger
 * /api/v1/order:
 *   delete:
 *     summary: clear Cart
 *     tags: [Order]
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

// router.delete('/', authController.protect, cartController.clearCart);





module.exports = router;
