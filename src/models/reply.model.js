import mongoose, { Schema } from "mongoose";

const replySchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    commentid: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "Creator"
    },
    parentReplyId: {
        // []
        type: Schema.Types.ObjectId,
        ref: "Reply",
        default: null // Important for top-level replies
    },
    text: {
        type: String,
        required: true
    },
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false
    },
    report: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]

}, { timestamps: true })



export const Reply = mongoose.model("Reply", replySchema);
