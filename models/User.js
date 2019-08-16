const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.statics.getAllUsers = function () {
    return this.find().exec();
};

UserSchema.statics.getUser = function (userID) {
    return this.findOne({ _id: userID }).exec()

};

module.exports = mongoose.model('User', UserSchema);
