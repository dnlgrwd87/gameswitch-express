const User = require('../models/User');
const UserItem = require('../models/UserItem');
const Item = require('../models/Item');
const { validateObjectId, hasValidationErrors } = require('../helpers/validators');
const bcyrpt = require('bcrypt');

module.exports.loginUser = async (req, res) => {
    // check for validation errors
    const errorMsg = hasValidationErrors(req);
    if (errorMsg.length) {
        return res.render('login', { user: req.session.theUser, error: errorMsg, page: '' });
    }

    //find user by email in database
    const user = await User.findOne({
        email: req.body.email
    }).exec();

    // redirect if user not found
    if (!user) {
        return res.render('login', { user: req.session.theUser, error: 'User not found. Please try again.', page: '' });
    }

    // verify entered password matches password in the database
    const validPassword = await bcyrpt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.render('login', { user: req.session.theUser, error: 'You entered an incorrect password. Please try again.', page: '' });
    }

    // store user in session
    req.session.theUser = user;
    
    const userItems = await UserItem.find({ userID: req.session.theUser._id }).exec();

    // store user profile in session
    req.session.userProfile = {
        theUser: req.session.theUser._id,
        userItems: userItems || []
    };

    res.redirect('/myItems');
};

module.exports.registerUser = async (req, res) => {
    // check for validation errors
    const errorMsg = hasValidationErrors(req);
    if (errorMsg.length) {
        return res.render('register', { user: req.session.theUser, error: errorMsg, page: '' });
    }

    // check if user with posted email already exists
    const existingUser = await User.findOne({
        email: req.body.email
    }).exec();

    // redirect if email is in use
    if (existingUser) {
        return res.render('register', { user: req.session.theUser, error: `User with email ${req.body.email} already exists.`, page: '' });
    }

    // redirect if passwords to not match
    if (req.body.password !== req.body.confirmPassword) {
        return res.render('register', { user: req.session.theUser, error: 'The passwords you entered do not match.', page: '' });
    }

    // hash and salt password
    const hashedPassword = await bcyrpt.hash(req.body.password, 10);

    //create new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });

    // create new user and store in session
    req.session.theUser = await user.save();

    const userItems = await UserItem.find({ userID: req.session.theUser._id }).exec();

    // store user profile in session    
    req.session.userProfile = {
        theUser: req.session.theUser._id,
        userItems: userItems || []
    };

    res.redirect('/myItems');
};

module.exports.logout = (req, res) => {
    // delete session and redirect
    delete req.session['theUser'];
    delete req.session['userProfile'];
    res.redirect('/');
};

module.exports.addItem = async (req, res) => {
    // check for validation errrors
    if (hasValidationErrors(req).length || !validateObjectId(req.body.itemCode)) {
        return res.redirect('/myItems');
    }

    // if user gets to add page somehow for an item they already have, redirect them to the myItems page
    const existingItem = req.session.userProfile.userItems.find(item => item.item._id === req.body.itemCode);
    if (existingItem) {
        return res.redirect('/myItems');
    }

    // create a user item
    const item = await Item.findOne({ _id: req.body.itemCode });
    const userItem = new UserItem({
        userID: req.session.theUser._id,
        item: item,
        rating: req.body.rating,
        ownIt: false
    });

    // save user item to database
    const savedItem = await userItem.save();

    // update user profile in the session
    req.session.userProfile.userItems.push(savedItem);
    req.session.save();

    res.redirect('/myItems');
};

module.exports.removeItem = async (req, res) => {
    // check for validation errrors
    if (hasValidationErrors(req).length || !validateObjectId(req.body.itemCode)) {
        return res.redirect('/myItems');
    }

    const userItems = req.session.userProfile.userItems;
    const removedItem = await UserItem.findOneAndRemove({ _id: req.body.itemCode }).exec();

    req.session.userProfile.userItems = userItems.filter(ui => {
        return ui._id != removedItem._id;
    });
    req.session.save();

    res.redirect('/myItems');
};

module.exports.updateFeedback = (req, res) => {
    // check for validation errrors
    if (hasValidationErrors(req).length || !validateObjectId(req.params.itemCode)) {
        console.log(hasValidationErrors(req));
        return res.redirect('/categories');
    }

    const userItems = req.session.userProfile.userItems;
    const index = userItems.findIndex(ui => ui._id == req.body.itemCode);
    const userItem = userItems[index];

    if (userItem) {
        return res.render('feedback', {
            user: req.session.theUser,
            userItem: userItem,
            page: 'myItems'
        });
    }

    res.redirect('/myItems');
};

module.exports.saveFeedback = async (req, res) => {
    // check for validation errrors
    if (hasValidationErrors(req).length || !validateObjectId(req.body.itemCode)) {
        return res.redirect('/myItems');
    }

    // update user item
    const rating = req.body.rating;
    const ownIt = req.body.ownIt ? true : false;
    const updatedItem = await UserItem.findOneAndUpdate(
        { _id: req.body.itemCode },
        { $set: { rating: rating, ownIt: ownIt } },
        { new: true }
    ).exec();

    // find index of updated user item
    const userItems = req.session.userProfile.userItems;
    const index = userItems.findIndex(userItem => userItem._id == updatedItem._id);

    // update user items array in session
    req.session.userProfile.userItems[index] = updatedItem;
    req.session.save();

    res.redirect('/myItems');
};
