const Item = require('../models/Item');
const { validateObjectId, hasValidationErrors } = require('../helpers/validators');


module.exports.login = (req, res) => {
    res.render('login', { user: req.session.theUser, error: '', page: '' });
};

module.exports.register = (req, res) => {
    res.render('register', { user: req.session.theUser, page: '', error: null });
};

module.exports.index = (req, res) => {
    res.render('index', { user: req.session.theUser, page: 'index' });
};

module.exports.contact = (req, res) => {
    res.render('contact', { user: req.session.theUser, page: 'contact' });
};

module.exports.about = (req, res) => {
    res.render('about', { user: req.session.theUser, page: 'about' });
};

module.exports.categories = async (req, res) => {
    const category = req.query.category;
    const categories = ['nintendo', 'xbox', 'playstation']
    
    // render categories page if no query parameters
    if (!category) {
        return res.render('categories', {
            user: req.session.theUser,
            page: 'categories'
        });
    }

    // if category name isn't valid, redirect to categories page
    if (!categories.includes(category)) {
        console.log(`${category} is not a category in the database.`);
        return res.redirect(req.path);
    }

    // else load items page for category in query params
    const games = await Item.getItemsByCategory(req.query.category);
    return res.render('categoryGames', {
        category: req.query.category,
        games: games,
        user: req.session.theUser,
        page: 'categories'
    })
};



module.exports.myItems = async (req, res) => {
    // render myItems page
    res.render('myItems', {
        user: req.session.theUser,
        userItems: req.session.userProfile.userItems,
        page: 'myItems'
    });
};

module.exports.singleItem = async (req, res) => {
    // check for validation errrors
    if (hasValidationErrors(req)) {
        return res.redirect('/categories');
    }

    // check to make sure item code is a valid mongoose id
    if (!validateObjectId(req.params.itemCode)) {
        return res.redirect('/categories')
    }

    // if a user is logged in, check to see if item is in their list
    if (req.session.theUser && req.session.userProfile) {
        const userItems = req.session.userProfile.userItems;
        const userItem = userItems.find(userItem => userItem.item._id == req.params.itemCode);

        // if so, display the update feedback page
        if (userItem) {
            return res.render('feedback', {
                user: req.session.theUser,
                userItem: userItem,
                page: 'myItems'
            });
        }
    }

    // otherwise, display the item page
    let item = await Item.getItem(req.params.itemCode);
    if (item) {
        return res.render('item', {
            user: req.session.theUser,
            game: item,
            page: 'categories'
        });
    }

    res.redirect('/categories');
};
