const express = require('express');
const router = express.Router();
const subCategoryController = require('../controllers/subCategory');
const authController = require("../controllers/auth");


/**
 * @swagger
 * tags:
 *   name: SubCategories
 *   description: SubCategories management
 */

/**
 * @swagger
 * /api/v1/subCategory:
 *   get:
 *     summary: Get all subCategories
 *     tags: [SubCategories]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/subCategories'
 */
router.get("/", subCategoryController.getSubCategory);

/**
 * @swagger
 * /api/v1/subCategory/{id}:
 *   get:
 *     summary: Get a subCategories by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subCategories to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A subCategories object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/subCategories'
 */
router.get('/:id', subCategoryController.getSubCategoryById);

/**
 * @swagger
 * /api/v1/subCategory:
 *   post:
 *     summary: Create a new subCategories
 *     tags: [SubCategories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the subCategories
 *                 example: Sample subCategories
 *               CategoryId:
 *                 type: integer
 *                 description: The Id of the Categories
 *                 example: 1
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the subCategories (file upload)
 *     responses:
 *       '201':
 *         description: Successfully created subCategories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/subCategories'
 */


router.post(
  "/",
  authController.protect,
  authController.allowTo("admin", "manager"),
  subCategoryController.postSubCategory
);

/**
 * @swagger
 * /api/v1/subCategory/{id}:
 *   patch:
 *     summary: Update a subCategories by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subCategories to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/subCategories'
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the subCategories
 *                 example: Sample subCategories
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the subCategories (file upload)
 *     responses:
 *       '200':
 *         description: Successfully updated subCategories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/subCategories'
 */

router.patch(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager"),
  subCategoryController.updateSubCategory
);

/**
 * @swagger
 * /api/v1/subCategory/{id}:
 *   delete:
 *     summary: Delete a subCategory by ID
 *     tags: [SubCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subCategories to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted subCategories
 */

router.delete(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager"),
  subCategoryController.deleteSubCategory
);


module.exports = router;