import mongoose, { Schema } from "mongoose";

const downSchema = new Schema({
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


downSchema.index({ userid: 1, reviewid: 1 }, { unique: true });


export const Down = mongoose.model("Down", downSchema);
