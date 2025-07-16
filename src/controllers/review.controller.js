import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
// import { SendEmail } from "../middlewares/auth.middlewares.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Creator } from "../models/cretor.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";
import { Review } from "../models/review.model.js";
import { Like } from "../models/like.model.js";
import { Up } from "../models/up.model.js";
import { Down } from "../models/down.model.js";
import { Comment } from "../models/comment.model.js";
import { Reply } from "../models/reply.model.js";
import { Commentlike } from "../models/likecomment.model.js";
import { Report } from "../models/report.model.js";
import { Notification } from "../models/notification.model.js";
import { ReplyLike } from "../models/replylike.model.js";
import { ReplyReport } from "../models/replyreport.model.js";

//user-review-creator-course
const userwritereview = asyncHandler(async (req, res) => {
    const { userreview, userrating, coursename, coursetype, creatorname, courseage, creatorid, courseid } = req.body
    const userID = req.users._id; // user performing the subscription
    //   console.log(userID);

    if (
        [userreview, userrating].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "User review and rating are required")
    }

    if (Number(userrating) === 0) {
        throw new ApiError(400, "Rating must be greater than zero")
    }

    const createreview = await Review.create({
        coursename: coursename,
        userreview,
        coursetype: coursetype,
        creatorname,
        courseage,
        userrating: userrating,
        userid: userID,
        creatorid: creatorid || null,
        courseid: courseid
    })
    return res
        .status(200)
        .json(new ApiResponse(200, createreview, "Review submitted successfully"));
})

//like-review
const userlike = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    console.log(userID);
    const { reviewID } = req.body
    console.log(reviewID);

    if (!reviewID) {
        throw new ApiError(400, "Review ID is required.");
    }
    const getlikes = await Like.create({
        userid: userID,
        reviewid: reviewID
    })
    if (!getlikes) {
        throw new ApiError(500, "Failed to like the review. Please try again.");
    }
    await Review.findByIdAndUpdate(
        reviewID,
        { $inc: { like: 1 } },  // ✅ increment like by 1
        { new: true }
    );
    // await Review.findByIdAndUpdate(reviewID, { $addToSet: { like: getlikes._id } }, { new: true })
    // await Like.findByIdAndUpdate()
    return res
        .status(200)
        .json(new ApiResponse(200, getlikes, "Review liked successfully"));
})

//remove-like-review
const removelikereview = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    console.log(userID);
    const { reviewID } = req.body
    console.log(reviewID);

    if (!reviewID) {
        throw new ApiError(400, "Review ID is required.");
    }
    //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

    const removed = await Like.findOneAndDelete({ userid: userID, reviewid: reviewID })
    await Review.findByIdAndUpdate(
        reviewID,
        { $inc: { like: -1 } },  // ✅ increment like by 1
        { new: true }
    );

    // const updatedReview = await Review.findByIdAndUpdate(
    //     reviewID,
    //     { $pull: { like: removed._id } },
    //     { new: true }
    // );

    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, "Failed to remove like from the review"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Like removed from the review successfully.")
        );
})

//up-votes of review
const userupvotes = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID } = req.body
    // console.log(reviewID);

    if (!reviewID) {
        throw new ApiError(400, "Review ID is required.");
    }

    const getupvotes = await Up.create({
        userid: userID,
        reviewid: reviewID
    })

    if (!getupvotes) {
        throw new ApiError(500, "Failed to register upvote. Please try again.");
    }
    await Review.findByIdAndUpdate(
        reviewID,
        { $inc: { up: 1 } },  // ✅ increment like by 1
        { new: true }
    );
    // await Review.findByIdAndUpdate(reviewID, { $addToSet: { up: getupvotes._id } }, { new: true })
    // await Up.findByIdAndUpdate()

    const removed = await Down.findOneAndDelete({ userid: userID, reviewid: reviewID })
    // console.log(removed);

    if (removed) {
        // console.log(removed);
        // throw new ApiError(500, "removed is  avialable");
        await Review.findByIdAndUpdate(
            reviewID,
            { $inc: { down: -1 } },  // ✅ increment like by 1
            { new: true }
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, getupvotes, "Upvote added to the review successfully"));
})

//remove-upvotes
const removeupvotes = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID } = req.body
    // console.log(reviewID);

    if (!reviewID) {
        throw new ApiError(400, "reviewID ID is required");
    }
    //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

    const removed = await Up.findOneAndDelete({ userid: userID, reviewid: reviewID })
    await Review.findByIdAndUpdate(
        reviewID,
        { $inc: { up: -1 } },  // ✅ increment like by 1
        { new: true }
    );

    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, "Upvote not found or already removed"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Upvote removed successfully")
        );
})

//down-votes-of-review
const userdownvotes = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID } = req.body
    // console.log(reviewID);

    if (!reviewID) {
        throw new ApiError(400, "reviewID ID is required");
    }

    const getdownvotes = await Down.create({
        userid: userID,
        reviewid: reviewID
    })

    if (!getdownvotes) {
        throw new ApiError(500, "Failed to register downvote. Please try again.");
    }

    await Review.findByIdAndUpdate(
        reviewID,
        { $inc: { down: 1 } },  // ✅ increment like by 1
        { new: true }
    );
    // await Review.findByIdAndUpdate(reviewID, { $addToSet: { down: getdownvotes._id } }, { new: true })
    // await Down.findByIdAndUpdate()

    const removed = await Up.findOneAndDelete({ userid: userID, reviewid: reviewID })
    // console.log(removed);

    if (removed) {
        // console.log(removed);
        // throw new ApiError(500, "removed is  avialable");
        await Review.findByIdAndUpdate(
            reviewID,
            { $inc: { up: -1 } },  // ✅ increment like by 1
            { new: true }
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, getdownvotes, "Downvote added to the review successfully"));
})

//remove-downvotes-of-review
const removedownvotes = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID } = req.body
    // console.log(reviewID);

    if (!reviewID) {
        throw new ApiError(400, "reviewID ID is required");
    }
    //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

    const removed = await Down.findOneAndDelete({ userid: userID, reviewid: reviewID })
    await Review.findByIdAndUpdate(
        reviewID,
        { $inc: { down: -1 } },  // ✅ increment like by 1
        { new: true }
    );

    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, "Downvote not found or already removedd"));
    }
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Downvote removed successfully."));
})

//usercoment
const usercomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID, comment } = req.body
    // console.log(reviewID);

    if (!comment || comment.trim() === "") {
        throw new ApiError(400, "Comment text is required.");
    }

    if (!reviewID) {
        throw new ApiError(400, "reviewID ID is required");
    }

    const commentwrite = await Comment.create({
        userid: userID,
        reviewid: reviewID,
        usercomment: comment
    })

    await Review.findByIdAndUpdate(
        reviewID,
        { $inc: { comment: 1 } },  // ✅ increment like by 1
        { new: true }
    );
    // await Review.findByIdAndUpdate(reviewID, { $addToSet: { comment: commentwrite._id } }, { new: true })
    // await Comment.findByIdAndUpdate()

    return res
        .status(200)
        .json(new ApiResponse(200, commentwrite, "Comment posted successfully"));
})

//edit-comment
const editusercomment = asyncHandler(async (req, res) => {
    const userid = req.users._id; // user performing the subscription
    // console.log(userid);
    const { reviewid, editcomment } = req.body
    // console.log(reviewid);

    if (!editcomment || editcomment.trim() === "") {
        throw new ApiError(400, "Comment text is required.");
    }

    if (!reviewid) {
        throw new ApiError(400, "reviewid is required");
    }

    const commentwrite = await Comment.findOneAndUpdate(
        { userid: userid, reviewid: reviewid },
        {
            $set: {
                userid: userid,
                reviewid: reviewid,
                usercomment: editcomment
            }
        }
        ,
        { new: true }
    )

    if (!commentwrite) {
        throw new ApiError(404, "Comment not found or you are not authorized to edit.");
    }

    // const commentwrite = await Comment.findOneAndUpdate({
    //     userid: userID,
    //     reviewid: reviewID,
    //     usercomment: editcomment
    // })

    return res
        .status(200)
        .json(new ApiResponse(200, commentwrite, "Comment updated successfully"));
})

//like-user-commnet
const likeusercomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { commentid } = req.body
    // console.log(commentid);

    if (!commentid) {
        throw new ApiError(400, "Comment ID is required.");
    }

    const getlikes = await Commentlike.create({
        userid: userID,
        commentid: commentid
    })

    // const alreadyLiked = await Commentlike.findOne({ userid: userID, commentid });
    // if (alreadyLiked) {
    //     throw new ApiError(400, "You have already liked this comment.");
    // }

    await Comment.findByIdAndUpdate(
        commentid,
        { $inc: { likecomment: 1 } },  // ✅ increment like by 1
        { new: true }
    );
    // await Comment.findByIdAndUpdate(commentid, { $addToSet: { likecomment: getlikes._id } }, { new: true })
    // await Commentlike.findByIdAndUpdate()
    return res
        .status(200)
        .json(new ApiResponse(200, getlikes, "Comment liked successfully"));
})

const removeuserlikecomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { commentid } = req.body
    // console.log(commentid);



    if (!commentid) {
        throw new ApiError(400, "reviewID ID is required");
    }
    //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

    const removed = await Commentlike.findOneAndDelete({ userid: userID, commentid: commentid })
    // const updatedReview = await Comment.findByIdAndUpdate(
    //     commentid,
    //     { $pull: { likecomment: removed._id } },
    //     { new: true }
    // );
    await Comment.findByIdAndUpdate(
        commentid,
        { $inc: { likecomment: -1 } },  // ✅ increment like by 1
        { new: true }
    );


    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, updatedReview, "Like not found"));
    }
    res.status(200).json(
        new ApiResponse(200, null, "commentlike was delete")
    );
})

const reportusercomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    console.log(userID);
    const { commentid, reason } = req.body
    // console.log(commentid);


    if (!reason) {
        throw new ApiError(400, "reason  is required");
    }
    const writereport = await Report.create({
        userid: userID,
        commentid: commentid,
        reason: reason,
    })

    if (!commentid) {
        throw new ApiError(400, "reviewID ID is required");
    }
    await Comment.findByIdAndUpdate(
        commentid,
        { $inc: { report: 1 } },  // ✅ increment like by 1
        { new: true }
    );
    // await Comment.findByIdAndUpdate(commentid, { $addToSet: { report: userID } }, { new: true })
    // await Report.findByIdAndUpdate()

    res.status(200).json(
        new ApiResponse(200, writereport, "comment was reported")
    );
})

const autodeletereport = asyncHandler(async (req, res) => {
    // const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewid } = req.body
    // console.log(commentid);
    const autoreportremove = await Comment.find()
    console.log("hello");
    let totalreport = 0


    autoreportremove.map(comment => {
        // console.log(comment.report.length,comment.report.Number,comment.report);
        if (comment.report >= 10) {
            console.log(`Comment ${comment._id} has ${comment.report} reports`);
            // Optional: Auto-mark it as deleted
            totalreport += 1
            comment.isDeleted = true;
            comment.save(); // Don't forget to await if you're using async loop
            // await Review.findByIdAndUpdate(
            //     reviewid,
            //     { $inc: { comment: -1 } },  // ✅ increment like by 1
            //     { new: true }
            // );
        }
    });
    await Review.findByIdAndUpdate(
        reviewid,
        { $inc: { comment: -totalreport } },  // ✅ increment like by 1
        { new: true }
    );
    // if (check > 10) {
    //     await Comment.find()
    // }
    return res
        .status(200)
        .json(new ApiResponse(200, null, "comment was reported"));
})

const deleteusercomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    console.log(userID);
    const { reviewid, commentid } = req.body
    // console.log(commentid); 

    const deletercomment = await Comment.findOne({
        _id: commentid, userid: userID
    })
    // console.log(deletereplycomment);

    if (deletercomment === null) {
        throw new ApiError(400, "user comment not deleted");
    }
    deletercomment.isDeleted = true
    await deletercomment.save()

    await Review.findByIdAndUpdate(
        reviewid,
        { $inc: { comment: -1 } },  // ✅ increment like by 1
        { new: true }
    );
    return res
        .status(200)
        .json(new ApiResponse(200, deletercomment, "commnet like  successfully"));


})



//reply comment
const replycomment = asyncHandler(async (req, res) => {
    let userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { replycomment, commentID, parentReplyId } = req.body
    // console.log(commentID);

    // const replycommentuser = await Comment.findById(reviewID)

    const replycommentuser = await Reply.create({
        userid: userID,
        commentid: commentID,
        parentReplyId: parentReplyId || null,
        text: replycomment
    });
    if (!parentReplyId) {
        await Comment.findByIdAndUpdate(
            commentID,
            { $inc: { replyid: 1 } },  // ✅ increment like by 1
            { new: true }
        );
        // await Comment.findByIdAndUpdate(commentID, { $addToSet: { replyid: replycommentuser._id } }, { new: true })
        // await Reply.findByIdAndUpdate()
    }

    // if (parentReplyId) {

    //     const toparentiduser = await Reply.findById(parentReplyId)
    //     if (toparentiduser) {
    //         // userID = toparentiduser.userid
    //     }
    //     console.log(toparentiduser,toparentiduser.userid);

    //     console.log(userID);

    // }

    if (!parentReplyId) {
        const touser = await Comment.findById(commentID).select("userid");
        if (touser && touser.userid.toString() !== userID.toString()) {
            const notifactiontoreplycommentuser = await Notification.create({
                toUserId: touser.userid,
                fromUserId: userID,
                commentId: commentID,
                replyId: replycommentuser._id,
            })
        }
    }
    if (parentReplyId) {
        const touser = await Reply.findById(parentReplyId)
        // if (touser) {
        //     // userID = touser.userid
        // }
        // console.log(touser,touser.userid);

        // console.log(userID);

        if (touser && touser.userid.toString() !== userID.toString()) {
            const notifactiontoreplycommentuser = await Notification.create({
                toUserId: touser.userid,
                fromUserId: userID,
                commentId: commentID,
                replyId: replycommentuser._id,
            })
        }
    }
    // console.log(touser);


    return res
        .status(200)
        .json(new ApiResponse(200, replycommentuser, "reply comment   successfully"));
})

//getuser-notification
// const getnotificationuser = asyncHandler(async (req, res) => {
//     const userID = req.users._id; // user performing the subscription
//     // console.log(userID);
//     // const { replycomment, commentID, parentReplyId } = req.body
//     // console.log(commentID);

//     const notifaction = await Notification.find({ toUserId: userID })
//         .sort({ createdAt: -1 })
//         .populate("fromUserId", "name")
//         .populate("commentId", "usercomment")
//         .populate("replyId", "text");
//     // console.log(notifaction);

//     if (!notifaction) {
//         throw new ApiError(400, "notifaction not any shows");
//     }

//     await Notification.updateMany(
//         { toUserId: userID, isRead: false },
//         { $set: { isRead: true } }
//     );


//     res.status(200)
//         .json(new ApiResponse(200, notifaction, "Fetched notifications"));

// })

const editreplycomment = asyncHandler(async (req, res) => {
    const userid = req.users._id; // user performing the subscription
    // console.log(userid);
    const { replyid, editreply } = req.body
    // console.log(replyid);

    if (!editreply) {
        throw new ApiError(400, "edit reply comment is needed ")

    }
    const replywrite = await Reply.findOneAndUpdate(
        { userid: userid, _id: replyid },
        {
            $set: {
                text: editreply
            }
        }
        ,
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, replywrite, "reply edit successfully"));
})

const likereplycomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { replytid } = req.body
    // console.log(commentid);


    const getlikes = await ReplyLike.create({
        userid: userID,
        replyid: replytid
    })
    if (!getlikes) {
        throw new ApiError(400, "something is worng  ")

    }
    // await Reply.findByIdAndUpdate(replytid, { $addToSet: { like: userID } }, { new: true })
    // await ReplyLike.findByIdAndUpdate()
    await Reply.findByIdAndUpdate(
        replytid,
        { $inc: { like: 1 } },  // ✅ increment like by 1
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, getlikes, "commnet like  successfully"));


})

const removereplylike = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { replyid } = req.body
    // console.log(commentid);



    if (!replyid) {
        throw new ApiError(400, "reviewID ID is required");
    }
    //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

    const removed = await ReplyLike.findOneAndDelete({ userid: userID, replyid: replyid })
    await Reply.findByIdAndUpdate(
        replyid,
        { $inc: { like: -1 } },  // ✅ increment like by 1
        { new: true }
    )
    // const updatedReply = await Reply.findByIdAndUpdate(
    //     replyid,
    //     { $pull: { like: userID } },
    //     { new: true }
    // );


    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, "Like not found"));
    }
    res.status(200).json(
        new ApiResponse(200, null, "replylike was delete")
    );
})

const reportreplycomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { replyid, reason } = req.body
    // console.log(commentid);


    if (!reason) {
        throw new ApiError(400, "reason  is required");
    }
    const writereport = await ReplyReport.create({
        userid: userID,
        replyid: replyid,
        reason: reason,
    })

    if (!replyid) {
        throw new ApiError(400, "reviewID ID is required");
    }
    await Reply.findByIdAndUpdate(
        replyid,
        { $inc: { report: 1 } },  // ✅ increment like by 1
        { new: true }
    )
    // await Reply.findByIdAndUpdate(replyid, { $addToSet: { report: userID } }, { new: true })
    // await ReplyReport.findByIdAndUpdate()

    res.status(200).json(
        new ApiResponse(200, writereport, "comment was reported")
    );
})

const autodeletereplyreport = asyncHandler(async (req, res) => {
    // const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { commentId } = req.body
    // console.log(commentid);
    const autoreportremove = await Reply.find()
    // console.log("hello");
    // let totalreport = 0


    for (const reply of autoreportremove) {
        if (reply.report >= 10) {
            // totalreport += 1;
            console.log(`Reply ${reply._id} has ${reply.report} reports`);

            // Mark reply as deleted
            reply.isDeleted = true;
            await reply.save();

            // Optional: Decrement counter (only if you're using a Number)
            if (!reply.parentReplyId) {
                await Comment.findByIdAndUpdate(
                    commentId, // Make sure `reply.commentid` is correct
                    { $inc: { replyid: -1 } }, // ✅ if you're tracking count
                    { new: true }
                );
            }

        }
    }
    // if (check > 10) {
    //     await Comment.find()
    // }
    return res
        .status(200)
        .json(new ApiResponse(200, null, "reply was reported"));
})

const deletereplycomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    console.log(userID);
    const { replyid, commentid } = req.body
    // console.log(commentid); 

    const deletereplycomment = await Reply.findOne({
        _id: replyid, userid: userID
    })
    // console.log(deletereplycomment);

    if (deletereplycomment === null) {
        throw new ApiError(400, "user comment not deleted");
    }
    deletereplycomment.isDeleted = true
    await deletereplycomment.save()

    if (!deletereplycomment.parentReplyId) {
        await Comment.findByIdAndUpdate(
            commentid, // Make sure `reply.commentid` is correct
            { $inc: { replyid: -1 } }, // ✅ if you're tracking count
            { new: true }
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "commnet like  successfully"));

})



// const replycommentreplyparentid = asyncHandler(async (req, res) => {
//     const userID = req.users._id; // user performing the subscription
//     console.log(userID);
//     const { replycomment, commentID ,} = req.body
//     console.log(commentID);

//     // const replycommentuser = await Comment.findById(reviewID)

//     const replycommentuser = await Reply.create({
//         userid:userID,
//         commentid:commentID,
//         // parentReplyId:
//         text:replycomment

//     });

//     // const replycommentuser = await Comment.findByIdAndUpdate(
//     //     commentID,
//     //     {
//     //         $push: {
//     //             replies: {
//     //                 user: userID,
//     //                 replyText: replycomment,
//     //                 createdAt: new Date() // optional, will use schema default if omitted
//     //             }
//     //         }
//     //     },
//     //     { new: true }
//     // );
//     // console.log(replycommentuser);

//     //  if (!replycommentuser) {
//     //         throw new ApiError(400, "replycomment is needed ")
//     //     }


//     // replycommentuser.replies =[{userID},{replycomment}]
//     await replycommentuser.save().catch(() => {
//         throw new ApiError(500, "Something went wrong while verifying your email. Please try again later.");
//     });

//     return res
//         .status(200)
//         .json(new ApiResponse(200, replycommentuser, "commentwrite  successfully"));
// })

// const updatelikereview = asyncHandler(async (req, res) => {
//     const userID = req.users._id; // user performing the subscription
//     console.log(userID);
//     const { reviewID } = req.body
//     console.log(reviewID);



//     if (!reviewID) {
//         throw new ApiError(400, "reviewID ID is required");
//     }
//     //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

//     await Review.findByIdAndUpdate(reviewID, { $addToSet: { like: userID } }, { new: true })
//     await Like.findByIdAndUpdate()
//     res.status(200).json(
//         new ApiResponse(200, null, "like was added")
//     );
// })


//showing review of course page
const showcurrentcoursereview = asyncHandler(async (req, res) => {
    const courseid = req.params.id;
    // console.log(courseid);

    const getcurrentcoursereview = await Review.find({ courseid: courseid })
    // console.log(getcurrentcoursereview);

    // getcurrentcoursereview.forEach((review, index) => {
    //     const totalLikes = review.like.length;
    //     const totalupvote = review.up.length
    //     const totaldown = review.down.length
    //     const totalcomment = review.comment.length
    //     // console.log(`Review ${index + 1}: ${totalLikes} like(s)`);
    // });

    // const totallike = getcurrentcoursereview.like.length
    // const totalupvote = getcurrentcoursereview.up.length
    // const totaldown = getcurrentcoursereview.down.length
    // const totalcomment = getcurrentcoursereview.comment.length
    res.status(200).json(
        new ApiResponse(200, { getcurrentcoursereview }, "comment updated was added")
    );
})

const getallcommentofreview = asyncHandler(async (req, res) => {
    const { reviewid } = req.body
    console.log(reviewid);

    const getshowcommentreview = await Comment.find({ reviewid: reviewid })

    res.status(200).json(
        new ApiResponse(200, { getshowcommentreview }, "comment updated was added")
    );
})

const getallreplycomment = asyncHandler(async (req, res) => {
    const { commentid } = req.body
    console.log(commentid);

    const getreplycomment = await Reply.find({ commentid: commentid })
    res.status(200).json(
        new ApiResponse(200, { getreplycomment }, "comment updated was added")
    );

})

const getonlyreply = asyncHandler(async (req, res) => {
    const { commentId } = req.body
    // console.log(commentId);

    // 1. Get all replies for this comment
    const allReplies = await Reply.find({ commentid: commentId }).lean();

    // 2. Function to build nested reply tree
    const buildReplyTree = (parentReply) => {
        const children = allReplies.filter(
            r => r.parentReplyId?.toString() === parentReply._id.toString()
        );
        return {
            ...parentReply,
            children: children.map(buildReplyTree)
        };
    };

    // 3. Get only top-level replies (parentReplyId === null)
    const topLevelReplies = allReplies.filter(
        r => !r.parentReplyId
    );

    // 4. Build structured tree
    const structuredReplies = topLevelReplies.map(buildReplyTree);

    // 5. Return response
    res.status(200).json(new ApiResponse(200, structuredReplies, "Fetched nested replies for the comment"));
})

const alluserratingofreview = asyncHandler(async (req, res) => {
    const courseid = req.params.id;
    // console.log(courseid);

    const { writerateing } = req.body

    const checkallreview = await Review.find({
        courseid: courseid, userrating: writerateing
    })

    return res
        .status(200)
        .json(new ApiResponse(200, checkallreview, "rating successfully"));
    // checkallreview.userrating = writerateing


})


//showing review  of creator page
const getcreatorreview = asyncHandler(async (req, res) => {
    const creatorid = req.params.id;
    // console.log(courseid);

    const getcurrentcreatorreview = await Review.find({ creatorid: creatorid })
    // console.log(getcurrentcoursereview);

    res.status(200).json(
        new ApiResponse(200, { getcurrentcreatorreview }, "shows creator review")
    );
})

const alluserratingofcreatorreview = asyncHandler(async (req, res) => {
    const creatorid = req.params.id;
    // console.log(courseid);

    const { writerateing } = req.body

    const checkallreview = await Review.find({
        creatorid: creatorid, userrating: writerateing
    })

    return res
        .status(200)
        .json(new ApiResponse(200, checkallreview, "rating successfully"));
    // checkallreview.userrating = writerateing


})

//other feature same as course page

//latest review
const latestreview = asyncHandler(async (req, res) => {

    const topreview = await Review.find({
        userrating: { $in: ["3", "4", "5"] }
    })
        .sort({ createdAt: -1 }); // 👈 sort newest first

    return res
        .status(200)
        .json(new ApiResponse(200, topreview, "topreview successfully"));

})








export {
    userwritereview, userlike, userupvotes, userdownvotes, usercomment,
    replycomment, showcurrentcoursereview,
    removelikereview, removeupvotes,
    removedownvotes, editusercomment, likeusercomment, removeuserlikecomment, reportusercomment, autodeletereport,
    deleteusercomment, editreplycomment, likereplycomment, removereplylike, reportreplycomment, autodeletereplyreport,
    deletereplycomment, getallcommentofreview, getallreplycomment, getonlyreply, alluserratingofreview, getcreatorreview, alluserratingofcreatorreview
    , latestreview
}