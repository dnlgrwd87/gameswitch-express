const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

// Require custom middlewares
const { requireAuth } = require('../middlewares/validation');

// Require controllers 
const { login, register, index, contact, about, categories, myItems, singleItem } = require('../controllers/catalogController');

// Define route patterns and check for validation
router.get('/', index);
router.get('/login', login)
router.get('/register', register)
router.get('/contact', contact);
router.get('/about', about);
router.get('/categories',
    check('category', 'Catalog name not found in the database').isAlpha().isIn(['nintendo', 'xbox', 'playstation']), categories);
router.get('/myItems', requireAuth, myItems);
router.get('/item/:itemCode',
    check('itemCode', 'Item code is not alphanumeric').isAlphanumeric(), singleItem);

module.exports = router;