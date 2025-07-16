import mongoose, { Schema } from "mongoose";

const upSchema = new Schema({
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


upSchema.index({ userid: 1, reviewid: 1 }, { unique: true });

export const Up = mongoose.model("Up", upSchema);
