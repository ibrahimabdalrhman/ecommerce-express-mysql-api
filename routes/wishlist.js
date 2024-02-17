const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const wishlistController = require("../controllers/wishlist");

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Users management
 */

/**
 * @swagger
 * /api/v1/wishlist:
 *   post:
 *     summary: add or delete product in wishlist
 *     tags: [Wishlist]
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
 *     responses:
 *       '200':
 *         description: A list of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */

router.post('/', authController.protect, wishlistController.addOrDeleteFromList);

/**
 * @swagger
 * /api/v1/wishlist:
 *   get:
 *     summary: get all products in wishlist
 *     tags: [Wishlist]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */
router.get('/',authController.protect,wishlistController.getWishlist)







module.exports = router;
