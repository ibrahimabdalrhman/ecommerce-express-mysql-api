const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const authController = require("../controllers/auth");


/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories management
 */

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all Categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categories'
 */
router.get('/', categoryController.getCategory);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A category object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 */
router.get('/:id', categoryController.getCategoryById);
/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the category
 *                 example: Sample category
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the category (file upload)
 *     responses:
 *       '201':
 *         description: Successfully created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 */


router.post(
  "/",
  authController.protect,
  authController.allowTo("admin", "manager"),
  categoryController.postCategory
);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/category'
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the category
 *                 example: Sample category
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the category (file upload)
 *     responses:
 *       '200':
 *         description: Successfully updated category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/category'
 */

router.patch(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager"),
  categoryController.updateCategory
);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted category
 */

router.delete(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager"),
  categoryController.deleteCategory
);


module.exports = router;