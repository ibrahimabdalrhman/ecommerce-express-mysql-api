const express = require("express");
const router = express.Router({mergeParams:true});
const authController = require("../controllers/auth");
const reviewsController = require("../controllers/reviews");


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Reviews for products
 */


/**
 * @swagger
 * /api/v1/product/{ProductId}/reviews:
 *   post:
 *     summary: add review  by Product ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: ID of the Product to add review
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: The rating of the product
 *                 example: 4
 *               title:
 *                   type: string
 *                   description: your review for product
 *     responses:
 *       '200':
 *         description: Successfully add review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/reviews'
 */

router.post('/', authController.protect,reviewsController.addReview);

/**
 * @swagger
 * /api/v1/product/{ProductId}/reviews:
 *   get:
 *     summary: get reviews 
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: ID of the Product to add review
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully add review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/reviews'
 */

router.get('/', authController.protect,reviewsController.getReviews);
/**
 * @swagger
 * /api/v1/product/{ProductId}/reviews/{ReviewId}:
 *   get:
 *     summary: get one review by id 
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: ID of the Product to add review
 *         schema:
 *           type: integer
 *       - in: path
 *         name: ReviewId
 *         required: true
 *         description: ID of the Review 
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully add review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/reviews'
 */

router.get('/:ReviewId', authController.protect,reviewsController.getReviewById);
/**
 * @swagger
 * /api/v1/product/{ProductId}/reviews/{ReviewId}:
 *   patch:
 *     summary: update one review by id 
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: ReviewId
 *         required: true
 *         description: ID of the Review 
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully add review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/reviews'
 */

router.patch('/:ReviewId', authController.protect,reviewsController.updateReview);
/**
 * @swagger
 * /api/v1/product/{ProductId}/reviews/{ReviewId}:
 *   delete:
 *     summary: delete one review by id 
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: ReviewId
 *         required: true
 *         description: ID of the Review 
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully add review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/reviews'
 */

router.delete('/:ReviewId', authController.protect,reviewsController.deleteReview);





module.exports = router;