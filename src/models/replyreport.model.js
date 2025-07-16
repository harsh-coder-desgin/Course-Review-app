
import mongoose, { Schema } from "mongoose";

const replyreportSchema = new Schema({
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
    reason: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'dismissed'],
        default: 'pending' // ← starts as "pending"
    },
    moderatorNote: {
        type: String
    }
}, { timestamps: true })

replyreportSchema.index({ userid: 1, replyid: 1 }, { unique: true });

export const ReplyReport = mongoose.model("ReplyReport", replyreportSchema);
