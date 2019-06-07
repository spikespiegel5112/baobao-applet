const path = require('path');

const express = require('express');

const adminControllers = require('../controllers/admin')

const router = express.Router();

router.get('/product-list', adminControllers.getProductList);
router.post('/add-product', adminControllers.postAddProduct);
router.put('/edit-product', adminControllers.postEditProduct);
router.delete('/delete-product', adminControllers.deleteProduct);

module.exports = router;