// check to see if user is logged in or not
module.exports.requireAuth = (req, res, next) => {
    if (!req.session.theUser || !req.session.userProfile) {
        return res.redirect('/login');
    }
    next();
};

// validate that the origin of the request came from the page
module.exports.validateOrigin = (req, res, next) => {
    const itemList = req.body.itemList;
    const itemCode = req.body.itemCode || req.params.itemCode;

    // redirect to myItems if the item list doesn't include the item code
    if (itemList && itemCode && !itemList.includes(itemCode)) {
        res.redirect('/myItems');
    } else {
        next();
    }
};
