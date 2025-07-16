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
    likecomment: {
        type:Number,
        default:0
    },
    replyid:{
        type:Number,
        default:0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    report: {
        type:Number,
        default:0
    }
}, { timestamps: true })



export const Comment = mongoose.model("Comment", commentSchema);
