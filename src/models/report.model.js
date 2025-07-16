//rebort db ---userid,commentid,reason,status,moderatornote 

import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    commentid: {
        type: Schema.Types.ObjectId,
        ref: "Review"
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

reportSchema.index({ userid: 1, commentid: 1 }, { unique: true });

export const Report = mongoose.model("Report", reportSchema);
