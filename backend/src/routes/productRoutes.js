const router = require('express').Router();
const { getProducts, addProduct, getByBarcode } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', addProduct);
router.get('/barcode/:code', getByBarcode);

module.exports = router;