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

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },

    {
        toJSON: {
            virtuals: true,
        },

        id: false,
    }
);

userSchema.virtual("friendCounts").get(function() {
    let count = this.friends.length;
    return count;
});

const User = model("User", userSchema);

module.exports = User;

