import { Course } from "../models/course.model.js";
import { Reply } from "../models/reply.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloundinary } from "../utils/cloundinary.js"
import { v2 as cloudinary } from "cloudinary";
import { Comment } from "../models/comment.model.js"
import { Notification } from "../models/notification.model.js";
// import { CreatorFollow } from "../models/creatorfollow.model.js";

//add-course
const addcourse = asyncHandler(async (req, res) => {

    const ownercreatorname = req.users.creatorname

    function isValidSocialProfileURL(url, platform) {

        try {
            const myURL = new URL(url);
            const pathSegments = myURL.pathname.split("/").filter(Boolean);

            if (platform === "youtube") {
                return (
                    myURL.hostname === "www.youtube.com" &&
                    myURL.pathname.startsWith("/@") &&
                    pathSegments[0].startsWith("@") &&
                    pathSegments.length === 1 &&
                    pathSegments[0].length > 1 &&
                    myURL.protocol === 'https:'
                );
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    const { coursetitle, coursetype, courselength, description, yturl, whatlearnformcourse,
        tags, courseimage, price, discount } = req.body

    const vaildornotyoutube = isValidSocialProfileURL(yturl, "youtube")

    if (
        [coursetitle, coursetype, courselength, description, yturl, whatlearnformcourse,
            tags, courseimage].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Missing required fields. Please provide all necessary course details including: coursetitle, coursetype, courselength, description, yturl, whatlearnformcourse, tags, courseimage."
        )
    }

    if (vaildornotyoutube === false) {
        throw new ApiError(400, "The provided YouTube URL is invalid. Please enter a valid YouTube channel");
    }

    if (coursetitle.trim().length < 5) {
        throw new ApiError(400, "Course title must be at least 5 characters long.");
    }

    if (courselength.trim().length > 10) {
        throw new ApiError(400, "Course duration must not exceed 10 characters.");
    }

    if (description.length < 25 || whatlearnformcourse.length < 25) {
        throw new ApiError(400, "Both 'What you'll learn' and course description must be at least 25 characters long.");
    }

    if (!["free", "paid"].includes(coursetype)) {
        throw new ApiError(400, "Course type must be either 'free' or 'paid'.");
    }

    if (Number(price) >= 10000000) {
        throw new ApiError(400, "Course price must be less than ₹10,000,000");
    }

    if (Number(discount) < 0) {
        throw new ApiError(400, "Discount cannot be negative.");
    }

    if (Number(discount) > Number(price)) {
        throw new ApiError(400, "Discount amount cannot be greater than the course price.");
    }

    const courseLocalPath = req.files?.courseimage?.[0];

    if (!courseLocalPath) {
        throw new ApiError(400, "Course image is required")
    }

    const imagecourse = await uploadOnCloundinary(courseLocalPath, "courses")

    if (!imagecourse) {
        throw new ApiError(400, "Failed to upload profile image. Please try again")
    }

    courseLocalPath.buffer = null;
    const currentYear = new Date().getFullYear();

    const coursesdata = await Course.create({
        coursetitle: coursetitle.toLowerCase(),
        coursetype: coursetype,
        ownername: ownercreatorname,
        courseyear: currentYear,
        courseimage: imagecourse.url,
        courseimagePublicId: imagecourse.public_id,
        courselength,
        description,
        whatlearnformcourse,
        yturl,
        tags,
        rating: 0,
        totalreview: 0,
        ownerid: req.users._id,
        price: price || 0,
        discount: discount || 0
    })

    await coursesdata.save().catch(() => {
        throw new ApiError(500, "Something went wrong while adding the course. Please try again later.");
    });

    if (!coursesdata) {
        throw new ApiError(500, "Failed to add the course to your account. Please try again")
    }

    return res.status(201).json(
        new ApiResponse(200, coursesdata, "Course has been added successfully.")
    )
})

//edit-course
const editcourse = asyncHandler(async (req, res) => {

    const courseId = req.params.id;

    function isValidSocialProfileURL(url, platform) {

        try {
            const myURL = new URL(url);
            const pathSegments = myURL.pathname.split("/").filter(Boolean);

            if (platform === "youtube") {
                return (
                    myURL.hostname === "www.youtube.com" &&
                    myURL.pathname.startsWith("/@") &&
                    pathSegments[0].startsWith("@") &&
                    pathSegments.length === 1 &&
                    pathSegments[0].length > 1 &&
                    myURL.protocol === 'https:'
                );
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    const { coursetitle, courselength, description, yturl, whatlearnformcourse, price, discount,
        tags } = req.body

    const vaildornotyoutube = isValidSocialProfileURL(yturl, "youtube")

    if (
        [coursetitle, courselength, description, yturl, whatlearnformcourse,
            tags].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Missing required fields. Please provide all necessary course details including: coursetitle, courselength, description, yturl, whatlearnformcourse, tags, courseimage.")
    }

    if (vaildornotyoutube === false) {
        throw new ApiError(400, "The provided YouTube URL is invalid. Please enter a valid YouTube channel");
    }

    if (coursetitle.trim().length < 5) {
        throw new ApiError(400, "Course title must be at least 5 characters long.");
    }

    if (courselength.trim().length > 10) {
        throw new ApiError(400, "Course duration must not exceed 10 characters.");
    }

    if (description.length < 25 || whatlearnformcourse.length < 25) {
        throw new ApiError(400, "Both 'What you'll learn' and course description must be at least 25 characters long.");
    }

    if (Number(price) >= 10000000) {
        throw new ApiError(400, "Course price must be less than ₹10,000,000");
    }

    if (Number(discount) < 0) {
        throw new ApiError(400, "Discount cannot be negative.");
    }

    if (Number(discount) > Number(price)) {
        throw new ApiError(400, "Discount amount cannot be greater than the course price.");
    }

    const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                coursetitle: coursetitle.toLowerCase(),
                courselength,
                description,
                whatlearnformcourse,
                yturl,
                tags,
                price: price || 0,
                discount: discount || 0
            }
        }
        ,
        { new: true }
    )

    await updatedCourse.save().catch(() => {
        throw new ApiError(500, "An unexpected error occurred while updating the course. Please try again later.");
    });

    if (!updatedCourse) {
        throw new ApiError(404, "Course not found. Please check the course ID and try again.");
    }

    return res.status(201).json(
        new ApiResponse(200, updatedCourse, "Course updated successfully")
    )
})

//edit-course-image
const editcourseimgae = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const courseLocalPath = req.files?.courseimage?.[0];

    if (!courseLocalPath) {
        throw new ApiError(400, "Course image is required. Please upload a valid image file");
    }

    const currentUser = await Course.findById(courseId);

    if (currentUser?.courseimagePublicId) {
        await cloudinary.uploader.destroy(currentUser.courseimagePublicId);
    }

    const imagecourse = await uploadOnCloundinary(courseLocalPath, "courses");

    if (!imagecourse.url) {
        throw new ApiError(400, "Failed to upload the course image. Please try again later");
    }

    const courseimageupdate = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                courseimage: imagecourse.url,
                courseimagePublicId: imagecourse.public_id,
            }
        },
        { new: true }
    )

    if (!courseimageupdate) {
        throw new ApiError(404, "Course image update failed or course not found.");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, courseimageupdate, "Course image updated successfully"));
})

// const checkAndUpdateNewCourseStatus = async () => {
//   const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

//   await Course.updateMany(
//     {
//       newcourse: true,
//       createdAt: { $lt: oneWeekAgo } // created before a week
//     },
//     { $set: { newcourse: false } }
//   );
// };



//get-all-course
const getallcourse = asyncHandler(async (req, res) => {

    const ownerid = req.users._id.toString()

    const getallcourse = await Course.find({ ownerid: ownerid })

    const totalcourse = getallcourse.length

    if (!getallcourse) {
        throw new ApiError(400, "Unable to fetch courses at the moment. Please try again later");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { getallcourse, totalcourse }, "All courses fetched successfully"));
})

//show-course
const showcourse = asyncHandler(async (req, res) => {

    const courseId = req.params.id;

    const courseget = await Course.findById(courseId)

    const countratingandreview = await Review.find({
        courseid: courseId
    })

    if (!countratingandreview) {
        throw new ApiError(404, "No reviews found for the selected course.");
    }

    const totalreview = countratingandreview.length

    let totalrating = 0;
    // let totalreview1 = 0;

    countratingandreview.forEach(course => {
        totalrating += course.userrating || 0;
        // totalreview += course.totalreview || 0;
    });

    const averageRating = totalreview > 0 ? (totalrating / totalreview).toFixed(1) : 0;
    // totalreview = countratingandreview.length
    // totalrating = countratingandreview.userrating.length

    courseget.totalreview = totalreview
    courseget.rating = averageRating

    await courseget.save()

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, courseget, "Course details fetched successfully"));
})

//course-overview-dashboard
const courseoverviewdashboard = asyncHandler(async (req, res) => {
    const ownerid = req.users._id.toString()

    const creatorcourse = await Course.find({ ownerid: ownerid })
    const totalcourse = creatorcourse.length

    if (!creatorcourse) {
        throw new ApiError(400, "Creator not found. Please try again");
    }

    let totalrating = 0;
    let totalreview = 0;

    creatorcourse.forEach(course => {
        totalrating += course.rating || 0;
        totalreview += course.totalreview || 0;
    });

    const averageRating = totalreview > 0 ? (totalrating / totalreview).toFixed(1) : 0;


    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago

    const newreview = await Review.find({
        createdAt: { $gte: twoHoursAgo }
    });
    const totalnewreview = newreview.length
    return res
        .status(200)
        .json(new ApiResponse(200, {
            totalcourse,
            totalreview,
            averageRating,
            totalnewreview
        }, "Dashboard fetched successfully"));
})

//delete-course
const deletecourse = asyncHandler(async (req, res) => {

    const courseId = req.params.id;

    const deletedata = await Course.findByIdAndDelete(courseId)

    if (!deletedata) {
        throw new ApiError(400, "Failed to delete the course. Please try again");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, "Course deleted successfully"));
})

//latest reviews shows in creator
const latestreview = asyncHandler(async (req, res) => {

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago

    const newreview = await Review.find({
        createdAt: { $gte: twoHoursAgo }
    });

    let totalreview = 0
    totalreview = newreview.length
    return res
        .status(200)
        .json(new ApiResponse(200, {
            newreview,
            totalreview
        }, "latest Review fetched successfully"));

})

//star-latest-review
const starlatestreview = asyncHandler(async (req, res) => {
    const { writestar } = req.body

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago

    const starnewreview = await Review.find({
        createdAt: { $gte: twoHoursAgo }, userrating: writestar
    });

    // const getstarreviewbyrating = await Review.find({userrating:writestar})
    return res
        .status(200)
        .json(new ApiResponse(200, starnewreview, "latest Star Review fetched successfully"));
})

//get-course-by-review
const getonecoursereview = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    // const courseget = await Course.findById(courseId)

    const getcourse = await Review.find({
        courseid: courseId
    })

    if (!getcourse || getcourse.length === 0) {
        throw new ApiError(404, "No reviews available for the selected course.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, getcourse, "Course fetched successfully"));
})

//get-start-by-course-review
const getstarbycoursereview = asyncHandler(async (req, res) => {

    const courseId = req.params.id;
    const { writestar } = req.body

    const coursereviewbystar = await Review.find({
        courseid: courseId, userrating: writestar
    });

    if (!coursereviewbystar || coursereviewbystar.length === 0) {
        throw new ApiError(404, `No ${writestar}-star reviews found for this course.`);
    }
    // const getstarreviewbyrating = await Review.find({userrating:writestar})
    return res
        .status(200)
        .json(new ApiResponse(200, coursereviewbystar, "Get Star By Course Review fetched successfully"));
})

//creator-reply
const creatorreply = asyncHandler(async (req, res) => {
    const creatorid = req.users._id
    console.log(creatorid);
    const { replycomment, commentID, parentReplyId } = req.body
    if (!commentID || !replycomment || replycomment.trim() === "") {
        throw new ApiError(400, "Reply text and comment ID are required.");
    }

    // console.log(commentID);

    // const replycommentuser = await Comment.findById(reviewID)

    const replycommentuser = await Reply.create({
        creatorid: creatorid,
        commentid: commentID,
        parentReplyId: parentReplyId || null,
        text: replycomment
    });

    if (!parentReplyId) {
        await Comment.findByIdAndUpdate(commentID, { $addToSet: { replyid: replycommentuser._id } }, { new: true })
        await Reply.findByIdAndUpdate()
    }
    if (!parentReplyId) {
        const touser = await Comment.findById(commentID).select("userid");
        const notifactiontoreplycommentuser = await Notification.create({
            toUserId: touser.userid,
            fromCreatorID: creatorid,
            commentId: commentID,
            replyId: replycommentuser._id,
        })

    }
    if (parentReplyId) {
        const toparentuser = await Reply.findById(parentReplyId)
        const notifactiontoreplycommentuser = await Notification.create({
            toUserId: toparentuser.userid,
            fromCreatorID: creatorid,
            commentId: commentID,
            replyId: replycommentuser._id,
        })
    }
    return res
        .status(200)
        .json(new ApiResponse(200, replycommentuser, "Creator Reply successfully"));
})

// const creatorfollower = asyncHandler(async(req,res)=>{
//         const courseId = req.users._id;
//         // console.log(courseId);

//         const count = await CreatorFollow.find({creatorid:courseId})

//         const  totalfollower = count.length
//         // console.log(count);

//      return res
//         .status(200)
//         .json(new ApiResponse(200, totalfollower, "totalfollower  successfully"));
// })
export {
    addcourse, editcourse, editcourseimgae, getallcourse, showcourse, courseoverviewdashboard,
    deletecourse, latestreview, starlatestreview, getonecoursereview, getstarbycoursereview, creatorreply
}