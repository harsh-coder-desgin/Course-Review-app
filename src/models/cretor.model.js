//name
//emial
//pass
//conform pass
//imgae
import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const creatorSchema = new Schema({
    creatorname:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    profile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    },
    profilePublicId: {
    type: String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    expiresAt:{
        type: Date,
        required: false
    },
    verficationCode:{
        type:String,
        required:false
    },
      refreshToken:{
        type:String
    },
    bio:{
        type:String,
        required:true
    },
    linkedin:{
        type:String
    },
    youtube:{
        type:String
    },
    github:{
        type:String
    },


//       totalCourses: {
//     type: Number,
//     default: 0
//   },
//   totalReviews: {
//     type: Number,
//     default: 0
//   },
//   averageRating: {
//     type: Number,
//     default: 0
//   }
    // verifyemail:{
    //     type:Boolean,
    //     default:false
    // },
    // verificationcode:{
    //     type:String
    // }
},
{
    timestamps:true
})

creatorSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

creatorSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(password,this.password)
}


creatorSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            creatorname:this.creatorname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


creatorSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const Creator = mongoose.model("Creator",creatorSchema)