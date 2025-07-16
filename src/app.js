import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// //routes import
// import userRouter from './routes/user.routes.js'
import cretorRouter from './routes/creator.router.js'
import courseRouter from './routes/course.route.js'
import userRouter from './routes/user.route.js'
import reviewRouter from './routes/review.route.js'
// //routes declaration
// app.use("/api/creator", userRouter)

app.use("/api/creator",cretorRouter)
app.use("/api/crouses",courseRouter)
app.use("/api/users",userRouter)
app.use("/api/review",reviewRouter)
// http://localhost:8000/api/v1/users/register

export { app }