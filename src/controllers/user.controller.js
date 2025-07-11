import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
// import { SendEmail } from "../middlewares/auth.middlewares.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Creator } from "../models/cretor.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

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

 
const userregister = asyncHandler(async(req,res)=>{
    const { username, email, password} = req.body

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
    
        res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully. Please verify your email to activate your account")
        )    

})

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

    res.status(201).json(
        new ApiResponse(200, "Email verified successfully. Welcome User!")
    )
})

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

    res.status(201).json(
        new ApiResponse(200, "A new verification code has been sent to your email")
    )
})

const userlogin = asyncHandler(async(req,res)=>{

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

const searchcreator = asyncHandler(async(req,res)=>{
    const {name} = req.body
    // console.log(name);
    
    if (!name) {
        throw new ApiError(401, "No creatorname is  found ");
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
    $project: {
      password: 0,
      profilePublicId: 0,
      isVerified: 0,
      bio:0,
      refreshToken:0
    }
  }
]


)
    // console.log(findcreatorname);
    
    
    res.status(201).json(
        new ApiResponse(200, findcreatorname,"search result")
    )
    
})

const searchcourse = asyncHandler(async(req,res)=>{
      const {course} = req.body
    // console.log(name);
    
    if (!course) {
        throw new ApiError(401, "No creatorname is  found ");
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
      rating:0,
      totalreview:0,
      yturl:0
    }
  }
]


)

// findcoursename = findcoursename.select("-whatlearnformcourse -courseimagePublicId -description")
    // const loginUser = await Creator.findById(users._id).select("-password -refreshToken")

    // console.log(findcreatorname);
    
    
    res.status(201).json(
        new ApiResponse(200, findcoursename,"search result")
    )
})

const latestcourse = asyncHandler(async(req,res)=>{

    const getcourse = await Course.find({newcourse:true})
 res.status(201).json(
            new ApiResponse(200, getcourse, "getcourse show her is ")
        )    
    
})

const getallcreator = asyncHandler(async(req,res)=>{
    const getcreator = await Creator.find().select("-password -refreshToken -bio")

    res.status(201).json(
            new ApiResponse(200, getcreator, "shows all creator ")
        ) 
            // const loginUser = await Creator.findById(users._id))
        

})

const paidcourse = asyncHandler(async(req,res)=>{
    const getpaidcourse = await Course.find({coursetype:"paid"})
    res.status(201).json(
            new ApiResponse(200, getpaidcourse, "shows only paid courses ")
        ) 
})

const freecourse = asyncHandler(async(req,res)=>{
    const getfreecourse = await Course.find({coursetype:"free"})
     res.status(201).json(
            new ApiResponse(200, getfreecourse, "shows only free courses ")
        ) 
})

const freecoursedetail = asyncHandler(async(req,res)=>{
    const courseId = req.params.id;
// console.log(courseId);

    const courseget = await Course.findById(courseId)

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    let ans = courseget.tags
            const realtedcourse =  await Course.find({
                tags:ans,
                _id:{$ne:new mongoose.Types.ObjectId(courseId)},
                coursetype:"free"
        })

    return res
        .status(200)
        .json(new ApiResponse(200, {courseget,realtedcourse}, "Course details fetched successfully"));
})



const paidcoursedetail = asyncHandler(async(req,res)=>{
    const courseId = req.params.id;
// console.log(courseId);

    const courseget = await Course.findById(courseId)

    if (!courseget) {
        throw new ApiError(400, "Course not found. Please check the ID and try again");
    }

    let ans = courseget.tags
            const realtedcourse =  await Course.find({
                tags:ans,
                _id:{$ne:new mongoose.Types.ObjectId(courseId)},
                coursetype:"paid"
        })

    return res
        .status(200)
        .json(new ApiResponse(200, {courseget,realtedcourse}, "Course details fetched successfully"));
})

const getonecreator = asyncHandler(async(req,res)=>{
      const courseId = req.params.id;
// console.log(courseId);

    const creatordetail = await Creator.findById(courseId).select("-password -refreshToken")

    const creatorcourse = await Course.find({ownerid:courseId})
    // console.log(creatorcourse);
    
      return res
        .status(200)
        .json(new ApiResponse(200, {creatordetail,creatorcourse}, "Course and creator shows" ));

})
export {userregister,userverfiyemail,userresendotp,userlogin,userlogout,searchcreator,searchcourse,latestcourse,getallcreator,paidcourse,freecourse,freecoursedetail,paidcoursedetail,getonecreator}