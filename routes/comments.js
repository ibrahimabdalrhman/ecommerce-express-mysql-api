const express = require("express");
const router = express.Router({mergeParams:true});
const productController = require("../controllers/product");
const authController = require("../controllers/auth");
const commentsController = require("../controllers/comments");



/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comments management
 */

/**
 * @swagger
 * /api/v1/product/{ProductId}/comments:
 *   post:
 *     summary: add Comments
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: ID of the Product to add comment
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: add comment for product
 *                 example: great product
 *     responses:
 *       '200':
 *         description: create new comment
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 */
router.post("/", authController.protect,commentsController.addComment);
/**
 * @swagger
 * /api/v1/product/{ProductId}/comments:
 *   get:
 *     summary: get all  Comments
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: ID of the Product to add comment
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: get all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 */
router.get("/", authController.protect,commentsController.getAllComments);
/**
 * @swagger
 * /api/v1/product/{ProductId}/comments/{CommentId}:
 *   delete:
 *     summary: delete Comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: ProductId
 *         required: true
 *         description: ID of the Product to add comment
 *         schema:
 *           type: integer
 *       - in: path
 *         name: CommentId
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: get all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 */
router.delete("/:CommentId", authController.protect,commentsController.deleteComment);



module.exports = router;