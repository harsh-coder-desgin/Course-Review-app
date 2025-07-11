//course name
//course type
//creator name
//course age


//your review
//rating
//like --[id]
//comment - -[id]
//up  --[id] 
// down --[id]
//date time  user posted
//course age --
//course name --
//course type --
//creator name
//user id
//creator id
//course id


//like db
//reviw id
// user id 
//up db 
//  down db
// comment db
// like 
//up
//down

import mongoose, { Schema } from "mongoose";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"


const reviewSchema = new Schema({
    coursename: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    userreview: {
        type: String,
        required: true,
        lowercase: true,
    },
    coursetype: {
        type: String,
        required: [true, "Course type is required"],
        enum: ["free", "paid"], // ✅ Ensures valid values only    
    },
    creatorname: {
        type: String
    },
    courseage: {
        type: Number,
        required: false
    },
    userrating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: "Like"
        }
    ],
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment", // reference to another collection
        },
    ],
    up: [
        {
            type: Schema.Types.ObjectId,
            ref: "Up"
        }
    ],
    down: [
        {
            type: Schema.Types.ObjectId,
            ref: "Down"
        }
    ],
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    creatorid: {
        type: Schema.Types.ObjectId,
        ref: "Creator"
    },
    courseid: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
},
    {
        timestamps: true
    })



export const Review = mongoose.model("Review", reviewSchema)

