const User = require("../models/user");

module.exports = {

    // get All users

    getUsers(req, res) {
        User.find().then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // getting a single user 

    getUserById(req, res) {
        User.findOne({_id: req.params.userId})
        .then((user) => !user ? res.status(404).json({message: "user not found"}) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // creating a user 

    createUser(req, res) {
        User.create(req.body).then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

    // Updating an user

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId},
            {runValidators: true, new: true})
            .then((user) => 
            !user ? res.status(404).json({message: "user not found"}) : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // delete a user 

    deleteUser(req, res) {

        User.findOneAndRemove({_id: req.params.userId}).then((user) => !user ? res.status(404).json({message: "User not Found"})
        : res.json(user)).catch((err) => res.status(500).json(err));
    }


};