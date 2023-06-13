const {Schema, model} = require("mongoose");
const reactionSchema = require("./reaction");
const thoughtSchema = require("./thought");

const userSchema = new Schema( 
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        thoughts: [thoughtSchema],

        friends: [userSchema],
    },

    {
        toJSON: {
            virtuals: true,
        },

        id: false,
    }
);

const User = model("User", userSchema);

module.exports = User;

