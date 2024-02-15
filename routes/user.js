const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get all Users
 *     tags: [Users]
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
router.get("/", userController.getUsers);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
router.get("/:id", userController.getUserById);
/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: 12345678
 *               phone:
 *                 type: string
 *                 description: The phone of the user
 *                 example: "+1234567890"
 *               role:
 *                 type: string
 *                 example: "admin  user"
 *               profileImage:
 *                   type: string
 *                   format: binary
 *                   description: The images of the user (file upload)
 *     responses:
 *       '201':
 *         description: Successfully created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */


router.post("/", userController.postUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
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
 *               profileImage:
 *                   type: string
 *                   format: binary
 *                   description: The images of the user (file upload)
 *     responses:
 *       '200':
 *         description: Successfully updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */

router.patch('/:id', userController.updateUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted user
 */

router.delete('/:id',userController.deleteUser);


module.exports = router;