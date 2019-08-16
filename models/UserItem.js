const mongoose = require('mongoose');

const UserItemSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    item: {
        _id: { type: mongoose.Schema.Types.ObjectId },
        itemName: { type: String, required: true },
        catalogCategory: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true },
        platform: { type: String, required: true },
        genres: { type: Array, required: true },
        retailPrice: { type: Number, required: true },
        imageURL: { type: String, required: true }
    },
    rating: { type: Number, required: true },
    ownIt: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model('UserItem', UserItemSchema);
