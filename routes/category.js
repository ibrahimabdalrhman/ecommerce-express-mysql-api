const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');

router.get('/',categoryController.getCategory)
router.get('/:id',categoryController.getCategoryById)
router.post('/',categoryController.postCategory);
router.patch('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);


module.exports = router;