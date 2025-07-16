import mongoose, { Schema } from "mongoose";

const creatorfollowerSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "Creator"
    },
}, { timestamps: true })

creatorfollowerSchema.index({ userid: 1, creatorid: 1 }, { unique: true });

export const CreatorFollow = mongoose.model("CreatorFollow", creatorfollowerSchema);
