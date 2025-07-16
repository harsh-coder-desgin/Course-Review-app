import mongoose, { Schema } from "mongoose";

const likereplySchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    replyid: {
        type: Schema.Types.ObjectId,
        ref: "Reply"
    },
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "Creator"
    },
}, { timestamps: true })

likereplySchema.index({ userid: 1, replyid: 1 }, { unique: true });

export const ReplyLike = mongoose.model("ReplyLike", likereplySchema);
