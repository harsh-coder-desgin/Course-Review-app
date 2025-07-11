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

const userwritereview = asyncHandler(async (req, res) => {
    const { userreview, userrating, coursename, coursetype, creatorname, courseage, creatorid, courseid } = req.body
    const userID = req.users._id; // user performing the subscription
    //   console.log(userID);

    if (
        [userreview, userrating].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "userreview and  userrating missing")
    }

    if (Number(userrating) === 0) {
        throw new ApiError(400, "userrating not be zero ")
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
        .json(new ApiResponse(200, createreview, "review  successfully"));

})


const userlike = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    console.log(userID);
    const { reviewID } = req.body
    console.log(reviewID);


    const getlikes = await Like.create({
        userid: userID,
        reviewid: reviewID
    })
    if (!getlikes) {
        throw new ApiError(400, "something is worng  ")

    }
    await Review.findByIdAndUpdate(reviewID, { $addToSet: { like: getlikes._id } }, { new: true })
    await Like.findByIdAndUpdate()
    return res
        .status(200)
        .json(new ApiResponse(200, getlikes, "review  successfully"));


})


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


const removelikereview = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    console.log(userID);
    const { reviewID } = req.body
    console.log(reviewID);



    if (!reviewID) {
        throw new ApiError(400, "reviewID ID is required");
    }
    //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

    const removed = await Like.findOneAndDelete({ userid: userID, reviewid: reviewID })
    const updatedReview = await Review.findByIdAndUpdate(
        reviewID,
        { $pull: { like: removed._id } },
        { new: true }
    );


    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, updatedReview, "Like not found"));
    }
    res.status(200).json(
        new ApiResponse(200, null, "like was delete")
    );
})


// const removeupdatelikereview = asyncHandler(async(req,res)=>{

// })
//new line



//up-votes of review
const userupvotes = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID } = req.body
    // console.log(reviewID);

    const getupvotes = await Up.create({
        userid: userID,
        reviewid: reviewID
    })
    await Review.findByIdAndUpdate(reviewID, { $addToSet: { up: getupvotes._id } }, { new: true })
    await Up.findByIdAndUpdate()

    const removed = await Down.findOneAndDelete({ userid: userID, reviewid: reviewID })
    // console.log(removed);

    if (removed) {
        // console.log(removed);
        // throw new ApiError(500, "removed is  avialable");
        const updatedReview = await Review.findByIdAndUpdate(
            reviewID,
            { $pull: { down: removed._id } },
            { new: true }
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, getupvotes, "upvotes give successfully"));


})

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
    const updatedReview = await Review.findByIdAndUpdate(
        reviewID,
        { $pull: { up: removed._id } },
        { new: true }
    );


    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, updatedReview, "Like not found"));
    }
    res.status(200).json(
        new ApiResponse(200, null, "upvote was delete")
    );
})

//down-votes of review
const userdownvotes = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID } = req.body
    // console.log(reviewID);


    const getdownvotes = await Down.create({
        userid: userID,
        reviewid: reviewID
    })

    await Review.findByIdAndUpdate(reviewID, { $addToSet: { down: getdownvotes._id } }, { new: true })
    await Down.findByIdAndUpdate()

    const removed = await Up.findOneAndDelete({ userid: userID, reviewid: reviewID })
    // console.log(removed);

    if (removed) {
        // console.log(removed);
        // throw new ApiError(500, "removed is  avialable");
        const updatedReview = await Review.findByIdAndUpdate(
            reviewID,
            { $pull: { up: removed._id } },
            { new: true }
        );
    }
    return res
        .status(200)
        .json(new ApiResponse(200, getdownvotes, "getdownvotes  successfully"));


})

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
    const updatedReview = await Review.findByIdAndUpdate(
        reviewID,
        { $pull: { down: removed._id } },
        { new: true }
    );


    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, updatedReview, "Like not found"));
    }
    res.status(200).json(
        new ApiResponse(200, null, "downvote was delete")
    );
})

//usercoment
const usercomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { reviewID, comment } = req.body
    // console.log(reviewID);

    if (!comment) {
        throw new ApiError(400, "comment is needed ")

    }


    const commentwrite = await Comment.create({
        userid: userID,
        reviewid: reviewID,
        usercomment: comment
    })

    await Review.findByIdAndUpdate(reviewID, { $addToSet: { comment: commentwrite._id } }, { new: true })
    await Comment.findByIdAndUpdate()

    return res
        .status(200)
        .json(new ApiResponse(200, commentwrite, "commentwrite  successfully"));


})

const editusercomment = asyncHandler(async (req, res) => {
    const userid = req.users._id; // user performing the subscription
    // console.log(userid);
    const { reviewid, editcomment } = req.body
    // console.log(reviewid);

    if (!editcomment) {
        throw new ApiError(400, "comment is needed ")

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


    // const commentwrite = await Comment.findOneAndUpdate({
    //     userid: userID,
    //     reviewid: reviewID,
    //     usercomment: editcomment
    // })

    return res
        .status(200)
        .json(new ApiResponse(200, commentwrite, "commentwrite  successfully"));


})

const likeusercomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    const { commentid } = req.body
    // console.log(commentid);


    const getlikes = await Commentlike.create({
        userid: userID,
        commentid: commentid
    })
    if (!getlikes) {
        throw new ApiError(400, "something is worng  ")

    }
    await Comment.findByIdAndUpdate(commentid, { $addToSet: { likecomment: getlikes._id } }, { new: true })
    await Commentlike.findByIdAndUpdate()
    return res
        .status(200)
        .json(new ApiResponse(200, getlikes, "commnet like  successfully"));


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
    const updatedReview = await Comment.findByIdAndUpdate(
        commentid,
        { $pull: { likecomment: removed._id } },
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
    // console.log(userID);
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
    await Comment.findByIdAndUpdate(commentid, { $addToSet: { report: userID } }, { new: true })
    await Report.findByIdAndUpdate()

    res.status(200).json(
        new ApiResponse(200, writereport, "comment was reported")
    );
})

const autodeletereport = asyncHandler(async (req, res) => {
    // const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    // const { commentid } = req.body
    // console.log(commentid);
    const autoreportremove = await Comment.find()
    console.log("hello");


    autoreportremove.map(comment => {
        // console.log(comment.report.length);
        if (comment.report.length >= 10) {
            console.log(`Comment ${comment._id} has ${comment.report.length} reports`);

            // Optional: Auto-mark it as deleted
            comment.isDeleted = true;
            comment.save(); // Don't forget to await if you're using async loop
        }
    });

    // if (check > 10) {
    //     await Comment.find()
    // }
    res.status(200).json(
        new ApiResponse(200, null, "comment was reported")
    );
})

const deleteusercomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
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

    const updatedReview = await Review.findByIdAndUpdate(
        reviewid,
        { $pull: { comment: commentid } },
        { new: true }
    );
    return res
        .status(200)
        .json(new ApiResponse(200, updatedReview, "commnet like  successfully"));


})



//reply comment
const replycomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
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
    await Comment.findByIdAndUpdate(commentID, { $addToSet: { replyid: replycommentuser._id } }, { new: true })
    await Reply.findByIdAndUpdate()
    const touser = await Comment.findById(commentID).select("userid");
    // console.log(touser);

    if (touser && touser.userid.toString() !== userID.toString()) {
        const notifactiontoreplycommentuser = await Notification.create({
            toUserId: touser.userid,
            fromUserId: userID,
            commentId: commentID,
            replyId: replycommentuser._id,
        })
    }
    // const replycommentuser = await Comment.findByIdAndUpdate(
    //     commentID,
    //     {
    //         $push: {
    //             replies: {
    //                 user: userID,
    //                 replyText: replycomment,
    //                 createdAt: new Date() // optional, will use schema default if omitted
    //             }
    //         }
    //     },
    //     { new: true }
    // );
    // console.log(replycommentuser);

    //  if (!replycommentuser) {
    //         throw new ApiError(400, "replycomment is needed ")
    //     }


    // replycommentuser.replies =[{userID},{replycomment}]
    // await replycommentuser.save().catch(() => {
    //     throw new ApiError(500, "Something went wrong while verifying your email. Please try again later.");
    // });

    return res
        .status(200)
        .json(new ApiResponse(200, replycommentuser, "reply comment   successfully"));
})

//getuser-notification
const getnotificationuser = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    // const { replycomment, commentID, parentReplyId } = req.body
    // console.log(commentID);

    const notifaction = await Notification.find({ toUserId: userID })
        .sort({ createdAt: -1 })
        .populate("fromUserId", "name")
        .populate("commentId", "usercomment")
        .populate("replyId", "text");
    // console.log(notifaction);

    if (!notifaction) {
        throw new ApiError(400, "notifaction not any shows");
    }

    await Notification.updateMany(
        { toUserId: userID, isRead: false },
        { $set: { isRead: true } }
    );


    res.status(200)
        .json(new ApiResponse(200, notifaction, "Fetched notifications"));

})

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
    await Reply.findByIdAndUpdate(replytid, { $addToSet: { like: userID } }, { new: true })
    await ReplyLike.findByIdAndUpdate()
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
    const updatedReply = await Reply.findByIdAndUpdate(
        replyid,
        { $pull: { like: userID } },
        { new: true }
    );


    if (!removed) {
        return res.status(400).json(new ApiResponse(400, null, updatedReply, "Like not found"));
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
    await Reply.findByIdAndUpdate(replyid, { $addToSet: { report: userID } }, { new: true })
    await ReplyReport.findByIdAndUpdate()

    res.status(200).json(
        new ApiResponse(200, writereport, "comment was reported")
    );
})

const autodeletereplyreport = asyncHandler(async (req, res) => {
    // const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    // const { commentid } = req.body
    // console.log(commentid);
    const autoreportremove = await Reply.find()
    // console.log("hello");


    autoreportremove.map(reply => {
        // console.log(comment.report.length);
        if (reply.report.length >= 10) {
            // console.log(`Comment ${reply._id} has ${reply.report.length} reports`);

            // Optional: Auto-mark it as deleted
            reply.isDeleted = true;
            reply.save(); // Don't forget to await if you're using async loop
        }
    });

    // if (check > 10) {
    //     await Comment.find()
    // }
    res.status(200).json(
        new ApiResponse(200, null, "reply was reported")
    );
})

const deletereplycomment = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
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

    const updatedReview = await Comment.findByIdAndUpdate(
        commentid,
        { $pull: { replyid: replyid } },
        { new: true }
    );
    return res
        .status(200)
        .json(new ApiResponse(200, updatedReview, "commnet like  successfully"));

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
// const updatereplycomment = asyncHandler(async (req, res) => {
//     // const userID = req.users._id; // user performing the subscription
//     // console.log(userID);
//     const { commentID, replyID, parentReplyId } = req.body
//     console.log(commentID);



//     if (!commentID) {
//         throw new ApiError(400, "reviewID ID is required");
//     }
//     //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")
//     if (!parentReplyId) {
//         await Comment.findByIdAndUpdate(commentID, { $addToSet: { replyid: replyID } }, { new: true })
//         await Reply.findByIdAndUpdate()
//     }

//     res.status(200).json(
//         new ApiResponse(200, null, "like was added")
//     );
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

// const updateupvotes = asyncHandler(async (req, res) => {
//     const userID = req.users._id; // user performing the subscription
//     console.log(userID);
//     const { reviewID } = req.body
//     console.log(reviewID);



//     if (!reviewID) {
//         throw new ApiError(400, "reviewID ID is required");
//     }
//     //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

//     await Review.findByIdAndUpdate(reviewID, { $addToSet: { up: userID } }, { new: true })
//     await Up.findByIdAndUpdate()
//     res.status(200).json(
//         new ApiResponse(200, null, "upvotes was added")
//     );
// })


// const updatedownvotes = asyncHandler(async (req, res) => {
//     const userID = req.users._id; // user performing the subscription
//     console.log(userID);
//     const { reviewID } = req.body
//     console.log(reviewID);



//     if (!reviewID) {
//         throw new ApiError(400, "reviewID ID is required");
//     }
//     //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

//     await Review.findByIdAndUpdate(reviewID, { $addToSet: { down: userID } }, { new: true })
//     await Down.findByIdAndUpdate()
//     res.status(200).json(
//         new ApiResponse(200, null, "upvotes was added")
//     );
// })

// const updatecommentreview = asyncHandler(async (req, res) => {
//     const userID = req.users._id; // user performing the subscription
//     console.log(userID);
//     const { reviewID } = req.body
//     console.log(reviewID);



//     if (!reviewID) {
//         throw new ApiError(400, "reviewID ID is required");
//     }
//     //   const loggediNUser = await User.findById(user._id).select("-password -refreshToken")

//     await Review.findByIdAndUpdate(reviewID, { $addToSet: { comment: userID } }, { new: true })
//     await Comment.findByIdAndUpdate()
//     res.status(200).json(
//         new ApiResponse(200, null, "comment updated was added")
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









// const showcommentofparticularreview = asyncHandler(async (req, res) => {
//     const { reviewid } = req.body
//     console.log(reviewid);

//     const showcurrentcomment = await Comment.find({ reviewid })
//     // let replycomment = showcurrentcomment.replyid
//     // console.log(replycomment);

//     // const showcurrentreply = await Reply.find({_id:replycomment})
//     res.status(200).json(
//         new ApiResponse(200, { showcurrentcomment }, "comment updated was added")
//     );
// })

// const showcurrentreplycomment = asyncHandler(async (req, res) => {
//     const { commentid } = req.body
//     console.log(commentid);
//     // if (!parentReplyId) {

//     const showcurrentreply = await Reply.find({
//         commentid,
//         parentReplyId: null
//     })

//     res.status(200).json(
//         new ApiResponse(200, showcurrentreply, "comment updated was added")
//     );
//     //   }
// })


// const replycommenttoreply = asyncHandler(async (req, res) => {

//     const { commentid } = req.body
//     const allReplies = await Reply.find({ commentid: commentid }).lean();
//     console.log(allReplies);

//     const buildReplyTree = (parentReply) => {
//         const children = allReplies.filter(
//             // parentReply != null
//             reply => reply.parentReplyId === reply.userid
//         );
//         console.log(children);

//         return {
//             ...parentReply,
//             children: children.map(buildReplyTree)
//         };
//     };

//     // 2. Get top-level replies (parentReplyId is null)
//     const topLevelReplies = allReplies.filter(
//         reply => reply.parentReplyId === null || reply.parentReplyId === undefined
//     );

//     // 3. Map tree
//     const structuredReplies = topLevelReplies.map(buildReplyTree);

//     // 4. Return result
//     res.status(200).json(
//         new ApiResponse(200, structuredReplies, "All replies nested")
//     );
// })
//make like api link
//same comment , up and down 
export {
    userwritereview, userlike, userupvotes, userdownvotes, usercomment,
    replycomment, showcurrentcoursereview,
    removelikereview, removeupvotes,
    removedownvotes, editusercomment, likeusercomment, removeuserlikecomment, reportusercomment, autodeletereport,
    deleteusercomment, getnotificationuser, editreplycomment, likereplycomment, removereplylike, reportreplycomment, autodeletereplyreport,
    deletereplycomment, getallcommentofreview, getallreplycomment, getonlyreply, alluserratingofreview, getcreatorreview, alluserratingofcreatorreview
    , latestreview
}