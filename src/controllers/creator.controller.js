import { Creator } from "../models/cretor.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloundinary } from "../utils/cloundinary.js"
import jwt from "jsonwebtoken"
import { URL } from "url"
import { SendEmail } from "../middlewares/auth.middlewares.js"
// import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
// import { error } from "console"
const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await Creator.findById(userId)
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

const registercreator = asyncHandler(async (req, res) => {

    const { creatorname, email, password, bio } = req.body

    if (
        [creatorname, email, password, bio].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields (creator name, email, password, and bio) are required")
    }

    if (creatorname.trim().length < 5) {
        throw new ApiError(400, "Creator name must be at least 5 characters long")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (bio.length < 25) {
        throw new ApiError(400, "Bio should be at least 25 characters long to help users understand who you are")
    }

    const existeduser = await Creator.findOne({
        $or: [{ email }, { creatorname }]
    })

    if (existeduser) {
        throw new ApiError(400, "A user with this email or creator name already exists")
    }

    const profileLocalPath = req.files?.profile?.[0];

    if (!profileLocalPath) {
        throw new ApiError(400, "Profile image is required")
    }

    const profile = await uploadOnCloundinary(profileLocalPath, "creator")

    if (!profile) {
        throw new ApiError(400, "Failed to upload profile image. Please try again")
    }

    profileLocalPath.buffer = null;
    const verficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const user = await Creator.create({
        creatorname: creatorname.toLowerCase(),
        email: email.toLowerCase(),
        password,
        profile: profile.url,
        profilePublicId: profile.public_id,
        verficationCode,
        expiresAt,
        bio: bio
    })

    SendEmail(user.email, verficationCode).catch(console.error);

    const createdUser = await Creator.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating your account. Please try again")
    }

    res.status(201).json(
        new ApiResponse(200, createdUser, "Creator registered successfully. Please verify your email to activate your account")
    )
})


const verfiyemail = asyncHandler(async (req, res) => {

    const { code } = req.body

    if (!code || code.trim() === "") {
        throw new ApiError(400, "Verification code is required")
    }

    const users = await Creator.findOne({
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

    res.status(201).json(
        new ApiResponse(200, "Email verified successfully. Welcome aboard!")
    )
})

const resendotp = asyncHandler(async (req, res) => {

    const { email } = req.body

    if (!email || email.trim() === "") {
        throw new ApiError(400, "Email is required to resend the verification code.");
    }

    const newverficationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const newExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const users = await Creator.findOne({
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

    res.status(201).json(
        new ApiResponse(200, "A new verification code has been sent to your email")
    )
})


const logincreator = asyncHandler(async (req, res) => {

    const { email, password, creatorname } = req.body
    if (
        [email, password, creatorname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Email, creator name, and password are required")
    }


    if (creatorname.trim().length < 5) {
        throw new ApiError(400, "Creator name must be at least 5 characters long")
    }

    if (password.trim().length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    const users = await Creator.findOne({
        $or: [{ creatorname }, { email }]
    })

    if (!users) {
        throw new ApiError(400, "No account matches the provided email and creator name")
    }

    if (users.creatorname !== creatorname || users.email !== email) {
        throw new ApiError(400, "The email or creator name is incorrect.");
    }
    const checkpasswordiscorrect = await users.isPasswordCorrect(password)

    if (!checkpasswordiscorrect) {
        throw new ApiError(400, "Incorrect password. Please try again")
    }

    const { refreshToken, accessToken } = await generateAccessRefreshTokens(users._id)
    const loginUser = await Creator.findById(users._id).select("-password -refreshToken")

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



const logoutcreator = asyncHandler(async (req, res) => {

    const userId = req.users._id

    if (!userId) {
        throw new ApiError(401, "User authentication failed. Please log in again.");
    }

    await Creator.findByIdAndUpdate(
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


const refreshaccesstoken = asyncHandler(async (req, res) => {

    const incomeingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomeingRefreshToken) {
        throw new ApiError(400, "Refresh token is missing. Please log in again")
    }

    try {
        const decodeedtoken = jwt.verify(
            incomeingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const users = await Creator.findById(decodeedtoken?._id)

        if (!users) {
            throw new ApiError(401, "Session is invalid or has expired. Please log in again.")
        }

        if (incomeingRefreshToken !== users.refreshToken) {
            throw new ApiError(401, "Session expired or token is invalid. Please log in again")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessRefreshTokens(users._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken },
                    "Access token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token. Please log in again")
    }
})

const changecurrentpassword = asyncHandler(async (req, res) => {

    const { oldpassword, newpassword } = req.body

    if (
        [oldpassword, newpassword].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Both old and new passwords are required")
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(newpassword)) {
        throw new ApiError(400, "NewPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (!strongPasswordRegex.test(oldpassword)) {
        throw new ApiError(400, "OldPassword must be at least 8 characters long and include uppercase, lowercase, number, and special character");
    }

    if (oldpassword === newpassword) {
        throw new ApiError(400, "New password must be different from the old password")

    }

    const users = await Creator.findById(req.users?._id)
    const ispasswordcorrect = await users.isPasswordCorrect(oldpassword)

    if (!ispasswordcorrect) {
        throw new ApiError(400, "Old password is incorrect")
    }

    users.password = newpassword
    await users.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getcurrentuser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.users,
            "User fetched Successfully"))
})

const editprofilcreator = asyncHandler(async (req, res) => {

    const oldprofile = req.users.profilePublicId
    const profileLocalPath = req.files?.profile?.[0];
    let imagename = profileLocalPath.originalname
    let oldimgaename= oldprofile.slice(15)
    let newimgaename = imagename.slice(0,-4)
    
    if (oldimgaename === newimgaename) {
        throw new ApiError(400, "Profile image is already upload");
    }

    if (!profileLocalPath) {
        throw new ApiError(400, "Profile image is required. Please upload a valid file");
    }

    const currentUser = await Creator.findById(req.users?._id);

    if (currentUser?.profilePublicId) {
        await cloudinary.uploader.destroy(currentUser.profilePublicId);
    }

    const profile = await uploadOnCloundinary(profileLocalPath, "creator");

    if (!profile.url) {
        throw new ApiError(400, "Failed to upload profile image. Please try again");
    }

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                profile: profile.url,
                profilePublicId: profile.public_id,
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200,users, "Profile updated successfully"));

})


const editcreatorname = asyncHandler(async (req, res) => {

    const oldcreatorname = req.users.creatorname
    const { newcreatorname } = req.body

    if (newcreatorname.trim() === "") {
        throw new ApiError(400, "Creator name is required.")
    }

    if (newcreatorname.trim().length < 5) {
        throw new ApiError(400, "Creator name must be at least 5 characters long")
    }

    if (oldcreatorname === newcreatorname) {
        throw new ApiError(400, "The new creator name must be different from the current one")
    }

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                creatorname: newcreatorname
            }
        }
        ,
        { new: true }
    )
        .select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Creator name updated successfully"));
})

const editbio = asyncHandler(async (req, res) => {

    const oldbio = req.users.bio
    const { bio } = req.body
    if (bio.trim() === "") {
        throw new ApiError(400, "Bio is required")
    }

    if (bio.length < 25) {
        throw new ApiError(400, "Bio must be more descriptive (at least 25 characters).")
    }

    if (oldbio === bio) {
        throw new ApiError(400, "The new bio must be different from the current one")
    }

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                bio: bio
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Bio updated successfully"));
})

const addsocialmedia = asyncHandler(async (req, res) => {

    function isValidSocialProfileURL(url, platform) {

        try {
            const myURL = new URL(url);
            const pathSegments = myURL.pathname.split("/").filter(Boolean); // Remove empty segments

            if (platform === "linkedin") {
                return (
                    myURL.hostname === "www.linkedin.com" &&
                    pathSegments[0] === "in" &&
                    pathSegments.length === 2 &&
                    pathSegments[1].length >= 3 && // minimum username length 
                    myURL.protocol === 'https:'

                );
            }

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

            if (platform === "github") {
                console.log(myURL);
                return (
                    myURL.hostname === "github.com" &&
                    pathSegments.length === 1 &&          // Only one path part (username)
                    pathSegments[0].length >= 4 &&
                    myURL.protocol === 'https:'
          // Username is long enough
                );
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    const { linkedin, youtube, github } = req.body

    if (
        [linkedin, youtube, github].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const vaildornotlinkedin = isValidSocialProfileURL(linkedin, "linkedin")
    const vaildornotyoutube = isValidSocialProfileURL(youtube, "youtube")
    const vaildornotgithub = isValidSocialProfileURL(github, "github")

    if (vaildornotlinkedin === false || vaildornotyoutube === false || vaildornotgithub === false) {
        throw new ApiError(400, "One or more social media links are invalid URLs.");
    }

    const users = await Creator.findByIdAndUpdate(
        req.users?._id,
        {
            $set: {
                linkedin: linkedin,
                youtube: youtube,
                github: github
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, users,"Socialmedia was added"));

})

export { registercreator, verfiyemail, resendotp, logincreator, logoutcreator, refreshaccesstoken, changecurrentpassword, getcurrentuser, editprofilcreator, editcreatorname, editbio, addsocialmedia }