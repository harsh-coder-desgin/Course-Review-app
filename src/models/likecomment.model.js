import mongoose, { Schema } from "mongoose";

const likecommentSchema = new Schema({
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
}, { timestamps: true })

likecommentSchema.index({ userid: 1, commentid: 1 }, { unique: true });

export const Commentlike = mongoose.model("Commentlike", likecommentSchema);
