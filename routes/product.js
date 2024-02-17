const express = require("express");
const router = express.Router();
const commentsRoute = require('./comments');
const productController = require("../controllers/product");
const authController = require("../controllers/auth");


router.use('/:ProductId/comments', commentsRoute);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 * parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after successful login
 *         required: true
 *         schema:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/",authController.protect ,productController.getProducts);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product
 *                 example: Sample Product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: This is a sample product description.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *                 example: 10
 *               sold:
 *                 type: integer
 *                 description: The number of products sold
 *                 example: 0
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product
 *                 example: 29.99
 *               priceAfterDiscount:
 *                 type: number
 *                 format: float
 *                 description: The price of the product after discount
 *                 example: 24.99
 *               ratingsAverage:
 *                 type: number
 *                 format: float
 *                 description: The average rating of the product
 *                 example: 4.5
 *               ratingsQuantity:
 *                 type: integer
 *                 description: The quantity of ratings for the product
 *                 example: 20
 *               CategoryId:
 *                 type: integer
 *                 description: The ID of the category to which the product belongs
 *                 example: 1
 *               BrandId:
 *                 type: integer
 *                 description: The ID of the brand of the product
 *                 example: 1
 *               SubCategoryId:
 *                 type: integer
 *                 description: The ID of the SubCategory of the product
 *                 example: 1
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the product (file upload)
 *     responses:
 *       '201':
 *         description: Successfully created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */


router.post(
  "/",
  authController.protect,
  authController.allowTo("admin", "manager","user"),
  productController.postProduct
);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the product
 *                 example: Sample Product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: This is a sample product description.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product
 *                 example: 10
 *               sold:
 *                 type: integer
 *                 description: The number of products sold
 *                 example: 0
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product
 *                 example: 29.99
 *               priceAfterDiscount:
 *                 type: number
 *                 format: float
 *                 description: The price of the product after discount
 *                 example: 24.99
 *               ratingsAverage:
 *                 type: number
 *                 format: float
 *                 description: The average rating of the product
 *                 example: 4.5
 *               ratingsQuantity:
 *                 type: integer
 *                 description: The quantity of ratings for the product
 *                 example: 20
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                   description: The images of the product (file upload)
 *     responses:
 *       '200':
 *         description: Successfully updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.patch(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager","user"),
  authController.protect,
  productController.updateProduct
);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted product
 */
router.delete(
  "/:id",
  authController.protect,
  authController.allowTo("admin", "manager","user"),
  productController.deleteProduct
);

module.exports = router;
