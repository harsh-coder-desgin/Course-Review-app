import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
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
}, { timestamps: true })

likeSchema.index({ userid: 1, reviewid: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);
