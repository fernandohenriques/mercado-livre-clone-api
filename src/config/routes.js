const express = require('express');
const router = express.Router();

/* Controllers */
const productController = require('../controllers/product-controller');

/* Routes */
router.get('/', (req, res) => {
  res.status(200).send({
    title: 'Mercado Livre Clone API - Built with love on Node.js.',
    version: '0.0.1',
  });
});

router.get('/items', productController.search);

router.get('*', (req, res) => res.status(404).send());

module.exports = router;
