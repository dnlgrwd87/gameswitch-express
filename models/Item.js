const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itemName: { type: String, required: true },
    catalogCategory: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    platform: { type: String, required: true },
    genres: { type: Array, required: true },
    retailPrice: { type: Number, required: true },
    imageURL: { type: String, required: true }
});

ItemSchema.statics.getAllItems = function () {
    return this.find().populate('postedBy', { firstName: 1, lastName: 1 }).exec();
};

ItemSchema.statics.getItemsByCategory = function (categoryName) {
    return this.find({ catalogCategory: categoryName }).populate('postedBy', { firstName: 1, lastName: 1 }).exec();
};

ItemSchema.statics.getItem = function (itemCode) {
    return this.findOne({ _id: itemCode }).populate('postedBy', { firstName: 1, lastName: 1 }).exec();
};

module.exports = mongoose.model('Item', ItemSchema);
