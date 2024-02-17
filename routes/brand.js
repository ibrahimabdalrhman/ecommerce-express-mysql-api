const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');
const authController = require("../controllers/auth");

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brands management
 */

/**
 * @swagger
 * /api/v1/brand:
 *   get:
 *     summary: Get all Brands
 *     tags: [Brands]
 *     responses:
 *       '200':
 *         description: A list of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brands'
 */
router.get("/", brandController.getBrands);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A brand object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/brand'
 */
router.get('/:id', brandController.getBrandById);
/**
 * @swagger
 * /api/v1/brand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the brand
 *                 example: Sample brand
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the brand (file upload)
 *     responses:
 *       '201':
 *         description: Successfully created brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/brand'
 */


router.post('/',authController.protect,authController.allowTo("admin","manager"), brandController.postBrand);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   patch:
 *     summary: Update a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/brand'
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The title of the brand
 *                 example: Sample brand
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the brand (file upload)
 *     responses:
 *       '200':
 *         description: Successfully updated brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/brand'
 */

router.patch(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager"),
  brandController.updateBrand
);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the brand to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted brand
 */

router.delete(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager"),
  brandController.deleteBrand
);


module.exports = router;