import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviewid: {
        type: Schema.Types.ObjectId,
        ref: "Review"
    },
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "Creator"
    },
    usercomment: {
        type: String,
        required: true
    },
    likecomment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Commentlike"
        }
    ],
    replyid: [
        {
            type: Schema.Types.ObjectId,
            ref: "Reply"
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



export const Comment = mongoose.model("Comment", commentSchema);
