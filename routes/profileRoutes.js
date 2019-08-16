const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { check } = require('express-validator/check');

// Require custom middlewares
const { requireAuth, validateOrigin } = require('../middlewares/validation');

// Require controllers 
const {
    loginUser,
    registerUser,
    logout,
    addItem,
    removeItem,
    updateFeedback,
    saveFeedback
} = require('../controllers/profileController');


// Define route patterns and check for validation
router.post('/loginUser', urlencodedParser, [
    check('email', 'You entered an invalid email.').isEmail()
], loginUser);
router.post('/registerUser', urlencodedParser, [
    check('firstName', 'First name must only contain 15 letters ot less.').isAlpha().isLength({ max: 15 }),
    check('lastName', 'Last name must only contain 15 letters or less.').isAlpha().isLength({ max: 15 }),
    check('email', 'You entered an invalid email.').isEmail(),
    check('password', 'Password must be between 5 and 15 characters.').isLength({ min: 5, max: 15 })
], registerUser);
router.get('/logout', logout);
router.post('/addItem', urlencodedParser, [
    check('itemCode', 'Item code is not alphanumeric.').isAlphanumeric(),
    check('rating', 'Rating must be a number between 1 and 5.').isInt({ min: 1, max: 5 })
], requireAuth, validateOrigin, addItem);
router.post('/removeItem', urlencodedParser, [
    check('itemCode', 'Item code is not alphanumeric.').isAlphanumeric()
], requireAuth, validateOrigin, removeItem);
router.post('/myItems/:itemCode', urlencodedParser,
    check('itemCode', 'Item code is not alphanumeric.').isAlphanumeric(), requireAuth, validateOrigin, updateFeedback);
router.post('/saveFeedback', urlencodedParser, [
    check('itemCode', 'Item code is not alphanumeric.').isAlphanumeric(),
    check('rating', 'Rating must be a number between 1 and 5.').isInt({ min: 1, max: 5 }),
    check('ownIt', 'Invalid value for ownIt.').isIn(['on', undefined])
], requireAuth, validateOrigin, saveFeedback);

module.exports = router;