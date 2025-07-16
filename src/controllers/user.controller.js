import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
// import jwt from "jsonwebtoken"
// import { SendEmail } from "../middlewares/auth.middlewares.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Creator } from "../models/cretor.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";
import { Notification } from "../models/notification.model.js";
import { CreatorFollow } from "../models/creatorfollow.model.js";

//generate-AccessRefreshTokens
const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        // const accessToken=user.generateAccessToken
        // const refreshToken=user.generateRefreshToken
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while refresh and access token")

    }
}

//user-register
const userregister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (user name, email, password) are required")
    }

    if (username.trim().length < 5) {
        throw new ApiError(400, "user name must be at least 5 characters long")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }
    const existeduser = await User.findOne({
        $or: [{ email }]
    })

    if (existeduser) {
        throw new ApiError(400, "A user with this email or user name already exists")
    }
    const verficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        verficationCode,
        expiresAt,
    })

    // SendEmail(user.email, verficationCode).catch(console.error);

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating your account. Please try again")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully. Please verify your email to activate your account")
    )

})

//verfiy-email
const userverfiyemail = asyncHandler(async (req, res) => {

    const { code } = req.body

    if (!code || code.trim() === "") {
        throw new ApiError(400, "Verification code is required")
    }

    const users = await User.findOne({
        verficationCode: code
    })

    if (!users) {
        throw new ApiError(400, "Invalid or expired verification code. Please try again")
    }

    if (users.expiresAt < new Date()) {
        throw new ApiError(400, "Your verification code has expired. Please request a new one")
    }

    users.verficationCode = undefined
    users.isVerified = true
    users.expiresAt = undefined

    await users.save().catch(() => {
        throw new ApiError(500, "Something went wrong while verifying your email. Please try again later.");
    });

    return res.status(201).json(
        new ApiResponse(200, "Email verified successfully. Welcome User!")
    )
})

//resend-otp
const userresendotp = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email is required to resend the verification code.");
    }

    const newverficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const users = await User.findOne({
        email: email
    })

    if (!users) {
        throw new ApiError(400, "No account found for the provided details")
    }

    users.verficationCode = newverficationCode
    users.expiresAt = newExpiry

    SendEmail(users.email, newverficationCode).catch(() => {
        throw new ApiError(500, "Unable to send verification code. Please try again later.");
    });

    await users.save().catch(() => {
        throw new ApiError(500, "Something went wrong while generating a new verification code.");
    });

    return res.status(201).json(
        new ApiResponse(200, "A new verification code has been sent to your email")
    )
})

//user-login
const userlogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (
        [email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Email, user name, and password are required")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    const users = await User.findOne({
        $or: [{ email }]
    })

    if (!users) {
        throw new ApiError(400, "No account matches the provided email and creator name")
    }

    if (users.email !== email) {
        throw new ApiError(400, "The email is incorrect.");
    }
    const checkpasswordiscorrect = await users.isPasswordCorrect(password)

    if (!checkpasswordiscorrect) {
        throw new ApiError(400, "Incorrect password. Please try again")
    }

    const { refreshToken, accessToken } = await generateAccessRefreshTokens(users._id)
    const loginUser = await User.findById(users._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200, {
                users: loginUser, accessToken,
                refreshToken
            },
                "Login successfully"
            )
        )

})

//user-logout
const userlogout = asyncHandler(async (req, res) => {

    const userId = req.users._id

    if (!userId) {
        throw new ApiError(401, "User authentication failed. Please log in again.");
    }

    await User.findByIdAndUpdate(
        userId, {
        $set: {
            refreshToken: ""
        }
    },
        {
            new: true
        }
    ).catch(() => {
        throw new ApiError(500, "Something went wrong while logging out. Please try again.");
    });

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

//search-creator
const searchcreator = asyncHandler(async (req, res) => {
    const { name } = req.body
    // console.log(name);

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Please enter a creator name to search.");
    }

    // creatorname.toLowerCase()
    // let text = name.toLowerCase()
    // let result = text.trim()
    // console.log(text,result);

    // const findcreatorname = await Creator.find({
    // creatorname: { $regex: `^${result}`, $options: "i" } // ^ = starts with, i = ignore case
    // });

    const findcreatorname = await Creator.aggregate(
        [
            {
                $search: {
                    index: "coursecreate",
                    autocomplete: {
                        query: name,         // what user is typing
                        path: "creatorname",     // the field you want to search
                        fuzzy: {
                            maxEdits: 2,        // allow up to 2 typos (optional)
                            prefixLength: 0,    // no required prefix before fuzzy starts
                            maxExpansions: 50   // how many variations to explore
                        }
                    }
                }
            },
            {
                $match: {
                    isVerified: true // ✅ only return verified creators
                }
            },
            {
                $project: {
                    password: 0,
                    profilePublicId: 0,
                    isVerified: 0,
                    bio: 0,
                    refreshToken: 0
                }
            }
        ]
    )
    // console.log(findcreatorname);

    if (!findcreatorname) {
        throw new ApiError(400, "Please provide a valid creator name to search.");
    }

    return res.status(201).json(
        new ApiResponse(200, findcreatorname, "Creator search results fetched successfully")
    )
})

//serach-course
const searchcourse = asyncHandler(async (req, res) => {
    const { course } = req.body
    // console.log(name);

    if (!course || course.trim() === "") {
        throw new ApiError(400, "Please enter a course name to proceed with the search");
    }

    // creatorname.toLowerCase()
    // let text = name.toLowerCase()
    // let result = text.trim()
    // console.log(text,result);

    // const findcreatorname = await Creator.find({
    // creatorname: { $regex: `^${result}`, $options: "i" } // ^ = starts with, i = ignore case
    // });

    const findcoursename = await Course.aggregate(
        [
            {
                $search: {
                    index: "namecourse",
                    autocomplete: {
                        query: course,         // what user is typing
                        path: "tags",     // the field you want to search
                        fuzzy: {
                            maxEdits: 2,        // allow up to 2 typos (optional)
                            prefixLength: 0,    // no required prefix before fuzzy starts
                            maxExpansions: 50   // how many variations to explore
                        }
                    }
                }
            },
            {
                $project: {
                    whatlearnformcourse: 0,
                    courseimagePublicId: 0,
                    description: 0,
                    rating: 0,
                    totalreview: 0,
                    yturl: 0
                }
            }
        ]
    )

    if (!findcoursename) {
        throw new ApiError(400, "No matching courses found for the given creator name.");
    }
    // findcoursename = findcoursename.select("-whatlearnformcourse -courseimagePublicId -description")
    // const loginUser = await Creator.findById(users._id).select("-password -refreshToken")

    // console.log(findcreatorname);

    return res.status(201).json(
        new ApiResponse(200, findcoursename, "Course search results fetched successfully")
    )
})

//latest-course
const latestcourse = asyncHandler(async (req, res) => {

    const getcourse = await Course.find()
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    console.log(oneWeekAgo);
    // console.log(getfreecourse.createdAt);


    for (const course of getcourse) {
        course.newcourse = course.createdAt >= oneWeekAgo; // true if within 7 days
        await course.save(); // save each document
    }

    const getallcourse = await Course.find({ newcourse: true })

    return res.status(201).json(
        new ApiResponse(200, getallcourse, "New courses fetched successfully")
    )

})

//get-allcreator
const getallcreator = asyncHandler(async (req, res) => {

    const getcreator = await Creator.find({ isVerified: true }).select("-password -refreshToken -bio")

    if (!getcreator || getcreator.length === 0) {
        throw new ApiError(404, "No creators found.");
    }

    return res.status(201).json(
        new ApiResponse(200, getcreator, "creators fetched successfully")
    )
})

//paid-course
const paidcourse = asyncHandler(async (req, res) => {
    const getpaidcourse = await Course.find({ coursetype: "paid" })
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    console.log(oneWeekAgo);
    // console.log(getfreecourse.createdAt);
    if (!getpaidcourse) {
        throw new ApiError(404, "No paid courses available at the moment.");
    }

    for (const course of getpaidcourse) {
        course.newcourse = course.createdAt >= oneWeekAgo; // true if within 7 days
        await course.save(); // save each document
    }
    return res.status(201).json(
        new ApiResponse(200, getpaidcourse, "Paid courses fetched successfully.")
    )
})

//free-course
const freecourse = asyncHandler(async (req, res) => {
    const getfreecourse = await Course.find({ coursetype: "free" })
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    console.log(oneWeekAgo);
    // console.log(getfreecourse.createdAt);

    if (!getfreecourse) {
        throw new ApiError(404, "No free courses available at the moment.");
    }

    for (const course of getfreecourse) {
        course.newcourse = course.createdAt >= oneWeekAgo; // true if within 7 days
        await course.save(); // save each document
    }

    return res.status(201).json(
        new ApiResponse(200, getfreecourse, "Free courses fetched successfully.")
    )
})

//free-course-detail
const freecoursedetail = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    // console.log(courseId);

    const courseget = await Course.findById(courseId)

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    let ans = courseget.tags
    const realtedcourse = await Course.find({
        tags: ans,
        _id: { $ne: new mongoose.Types.ObjectId(courseId) },
        coursetype: "free"
    })

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    // console.log(oneWeekAgo);
    // console.log(getfreecourse.createdAt);
    console.log(courseget.newcourse, courseget.courseyear);

    if (courseget.createdAt < oneWeekAgo) {
        courseget.newcourse = false; // more than 1 day old
        // console.log("New course false created at:", courseget.createdAt);

    } else {
        courseget.newcourse = true; // created within last 1 day
        // console.log("New course created at:", courseget.createdAt);
    }

    await courseget.save()
    return res
        .status(200)
        .json(new ApiResponse(200, { courseget, realtedcourse }, "Course details fetched successfully"));
})

//paid-course-detail
const paidcoursedetail = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    // console.log(courseId);

    const courseget = await Course.findById(courseId)

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    let ans = courseget.tags
    const realtedcourse = await Course.find({
        tags: ans,
        _id: { $ne: new mongoose.Types.ObjectId(courseId) },
        coursetype: "paid"
    })
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    // console.log(oneWeekAgo);
    // console.log(getfreecourse.createdAt);
    console.log(courseget.newcourse, courseget.courseyear);

    if (courseget.createdAt < oneWeekAgo) {
        courseget.newcourse = false; // more than 1 day old
        // console.log("New course false created at:", courseget.createdAt);

    } else {
        courseget.newcourse = true; // created within last 1 day
        // console.log("New course created at:", courseget.createdAt);
    }

    await courseget.save()
    return res
        .status(200)
        .json(new ApiResponse(200, { courseget, realtedcourse }, "Course details fetched successfully"));
})

//get-one-creator
const getonecreator = asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    // console.log(courseId);

    const creatordetail = await Creator.findById(courseId).select("-password -refreshToken")

    if (!creatordetail) {
        throw new ApiError(404, "Creator not found with the given ID.");
    }

    const creatorcourse = await Course.find({ ownerid: courseId })

    if (!creatorcourse) {
        throw new ApiError(404, "This creator has not added any courses yet.");
    }
    // console.log(creatorcourse);

    return res
        .status(200)
        .json(new ApiResponse(200, { creatordetail, creatorcourse }, "Creator profile and courses fetched successfully."));

})

//top-rated-course
const topratedcourse = asyncHandler(async (req, res) => {
    const topcourse = await Course.find({ rating: { $in: [4, 3, 2, 1] } });
    if (!topcourse) {
        throw new ApiError(404, "No top-rated courses found.");
    }

    return res.status(201).json(
        new ApiResponse(200, topcourse, "Top-rated courses fetched successfully.")
    )
})

//get-notification-user
const getnotificationuser = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    // console.log(userID);
    // const { replycomment, commentID, parentReplyId } = req.body
    // console.log(commentID);

    const notifaction = await Notification.find({ toUserId: userID })
        .sort({ createdAt: -1 })
        .populate("fromUserId", "name")
        .populate("commentId", "usercomment")
        .populate("replyId", "text")
        .populate("fromCreatorID", "text");
    // console.log(notifaction);

    if (!notifaction) {
        throw new ApiError(400, "No notifications found");
    }

    await Notification.updateMany(
        { toUserId: userID, isRead: false },
        { $set: { isRead: true } }
    );

    return res.status(200)
        .json(new ApiResponse(200, notifaction, "Notifications fetched successfully"));
})

//follow-creator
const followcreator = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    const creatorid = req.params.id
    // const {creatorid} = req.body

    const follow = await CreatorFollow.create({
        userid: userID,
        creatorid: creatorid
    })

    // const addcreatorfollow = await Creator.findById(creatorid)
    await Creator.findByIdAndUpdate(
        creatorid, // Make sure `reply.commentid` is correct
        { $inc: { follower: 1 } }, // ✅ if you're tracking count
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, follow, "Creator followed successfully"));
})

//unfollow-creator
const unfollowcreator = asyncHandler(async (req, res) => {
    const userID = req.users._id; // user performing the subscription
    const creatorid = req.params.id
    // const {creatorid} = req.body

    const unfollow = await CreatorFollow.findOneAndDelete({
        userid: userID,
        creatorid: creatorid
    })

    // const addcreatorfollow = await Creator.findById(creatorid)
    await Creator.findByIdAndUpdate(
        creatorid, // Make sure `reply.commentid` is correct
        { $inc: { follower: -1 } }, // ✅ if you're tracking count
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, unfollow, "Creator unfollowed successfully."));
})
export {
    userregister, userverfiyemail, userresendotp, userlogin, userlogout, searchcreator, searchcourse, latestcourse,
    getallcreator, paidcourse, freecourse, freecoursedetail, paidcoursedetail, getonecreator, topratedcourse, getnotificationuser
    , followcreator, unfollowcreator
}