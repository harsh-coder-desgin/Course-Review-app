import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloundinary } from "../utils/cloundinary.js"
import { v2 as cloudinary } from "cloudinary";

const addcourse = asyncHandler(async (req, res) => {

    const ownercreatorname = req.users.creatorname

    function isValidSocialProfileURL(url, platform) {

        try {
            const myURL = new URL(url);
            const pathSegments = myURL.pathname.split("/").filter(Boolean); // Remove empty segments

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

    res.status(201).json(
        new ApiResponse(200, coursesdata, "Course has been added successfully.")
    )
})

const editcourse = asyncHandler(async (req, res) => {

    const courseId = req.params.id;

    function isValidSocialProfileURL(url, platform) {

        try {
            const myURL = new URL(url);
            const pathSegments = myURL.pathname.split("/").filter(Boolean); // Remove empty segments

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

    res.status(201).json(
        new ApiResponse(200, updatedCourse, "Course updated successfully")
    )
})

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

const showcourse = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    const courseget = await Course.findById(courseId)

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, courseget, "Course details fetched successfully"));
})

const courseoverviewdashboard = asyncHandler(async (req, res) => {
    const ownerid = req.users._id.toString()

    const creatorcourse = await Course.find({ ownerid: ownerid })
    const totalcourse = creatorcourse.length

    let totalrating = 0;
    let totalreview = 0;

    creatorcourse.forEach(course => {
        totalrating += course.rating || 0;
        totalreview += course.totalreview || 0;
    });

    const averageRating = totalreview > 0 ? (totalrating / totalreview).toFixed(1) : 0;

    if (!creatorcourse) {
        throw new ApiError(400, "Creator not found. Please try again");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {
            totalcourse,
            totalrating,
            totalreview,
            averageRating
        }, "Dashboard fetched successfully"));
})

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

export { addcourse, editcourse, editcourseimgae, getallcourse, showcourse, courseoverviewdashboard, deletecourse }