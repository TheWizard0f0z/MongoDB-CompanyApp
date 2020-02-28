const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/products.controller');

router.get('/products', ProductController.getAll);
router.get('/products/random', ProductController.getRandom);
router.get('/products/:id', ProductController.getOneById);
router.post('/products', ProductController.postOne);
router.put('/products/:id', ProductController.updateOneById);
router.delete('/products/:id', ProductController.deleteOneById);

module.exports = router;
