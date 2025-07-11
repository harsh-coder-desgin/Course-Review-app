//title
//creatorrname
//course age
//type free or paid
//rating
//decrpition
//youtube url
//what leran form
//tags
//length course

// //course image/banner
// //title
// //creator/owner name
// //year  2020
// //type free or paid
// //course length
// // ---rating total rating among all / total rateing people like   3 people rating = 3+4+3 = 10 so  10/3people  ans= 3.3
//total reviews  ----
// //description
// //yt url
// //what learn form course
// // creator id
// //tags
//new course : true
// if a week is over then it fo false

import mongoose,{Schema} from "mongoose";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"



const courseSchema = new Schema({
    coursetitle:{
        type:String,
        required: [true, "Course title is required"],
        lowercase:true,
        trim:true,
        index:true
    },
    coursetype:{
        type:String,
        required: [true, "Course type is required"],
        enum: ["free", "paid"], // ✅ Ensures valid values only    
    },
    courseyear:{
        type:Number,
        required: [true, "Course year is required"],
    },
    courselength:{
        type:String,
        required: [true, "Course length is required"],
    },
    rating:{
        type:Number,
    },
    totalreview:{
        type:Number,
    },
    description: {
        type:String,
        required: [true, "Course description is required"],
    },
    yturl:{
        type:String,
        required:true
    },
    whatlearnformcourse:{
        type: String,
        required: [true, "Learning objectives are required"],
    },
    tags:{
        type:String,
        required:true
    },
    newcourse:{
        type:Boolean,
        default:true
    },
    courseimage:{
        type:String,
        required: [true, "Course image URL is required"],
    },
    courseimagePublicId:{
        type:String,
        required:true
    },
    ownerid:{
        type:Schema.Types.ObjectId,
        ref:"Creator"
    },
    ownername:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
},
{
    timestamps:true
})


export const Course = mongoose.model("Course",courseSchema)