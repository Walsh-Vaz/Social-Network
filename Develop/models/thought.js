const {Schema, model} =  require("mongoose");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now(),
        },
        
        username: {
            type: String,
            required: true,
        },
        
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Reaction",
            },
        ],  
    },

    {
        toJSON: {
            getters: true,
            virtuals: true,
        },

        id: false,
    },
);

thoughtSchema.virtual("reactionCounts").get(function() {
    count =  this.reactions.length;
    return count;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;