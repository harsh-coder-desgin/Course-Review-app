import {Router} from "express"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"
import { addcourse, courseoverviewdashboard, creatorreply, deletecourse, editcourse, editcourseimgae, getallcourse, getonecoursereview, getstarbycoursereview, latestreview, showcourse, starlatestreview } from "../controllers/course.controller.js";
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
//latest review 
router.route("/getlatestreview").get(verifyJWT,latestreview)
router.route("/getlateststarreview").post(verifyJWT,starlatestreview)
//get one course review
router.route("/getcoursereview/:id").get(verifyJWT,getonecoursereview)
router.route("/getstarbycourserview/:id").post(verifyJWT,getstarbycoursereview)
//creator reply
router.route("/creatorreply").post(verifyJWT,creatorreply)
//follower
// router.route("/follower").get(verifyJWT,creatorfollower)
export default router