import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
  toUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fromUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fromCreatorID: {
    type: Schema.Types.ObjectId,
    ref: "Creator"
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  replyId: {
    type: Schema.Types.ObjectId,
    ref: "Reply"
  },
  type: {
    type: String,
    enum: ["reply"],
    default: "reply"
  },
  isRead: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });



export const Notification = mongoose.model("Notification", notificationSchema);
