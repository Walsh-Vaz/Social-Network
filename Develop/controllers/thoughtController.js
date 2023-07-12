const Thought = require("../models/thought");
const User = require("../models/user");

module.exports = {
    // get all thoughts 

    getThoughts(req, res) {
        Thought.find().then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    // get one Thought

    getThoughtById(req, res) {
        Thought.findOne({_id: req.params.id})
        .then((thought) => !thought ? res.status(404).json({message: "Thought not found"}) 
        : res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    // create a Thought

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );
        })
        .then((user) => !user ? res.status(404).json({message: "user not found"}) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // updating a thought 
    
    updateThought(req, res) {
        console.log(req.params);
        Thought.findOneAndUpdate( { _id: req.params.id }, {$set: req.body},
            { runValidators: true, new: true })
            .then((thought) => {

                console.log(thought);
               return !thought ? res.status(404).json({ message: "user not found" }) : res.json(thought)
            })

            .catch((err) => res.status(500).json(err));
    },



};