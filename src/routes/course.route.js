import {Router} from "express"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"
import { addcourse, courseoverviewdashboard, deletecourse, editcourse, editcourseimgae, getallcourse, showcourse } from "../controllers/course.controller.js";
const router = Router()

router.get("/ping", (req, res) => {
  res.json({ message: "Ping successful!" });
});


router.route("/addcourse").post(verifyJWT,upload.fields([{ name: 'courseimage', maxCount: 1 }]),addcourse)
router.route("/updatecourse/:id").patch(verifyJWT,editcourse)
router.route("/updatecourseimage/:id").patch(verifyJWT,upload.fields([{ name: 'courseimage', maxCount: 1 }]),editcourseimgae)
router.route("/allcourses").get(verifyJWT,getallcourse)
router.route("/getcourse/:id").get(verifyJWT,showcourse)
router.route("/dashboardcreator").get(verifyJWT,courseoverviewdashboard)
router.route("/deletecourse/:id").get(verifyJWT,deletecourse)
export default router