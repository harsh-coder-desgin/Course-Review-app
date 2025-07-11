import {Router} from "express"
import {  freecourse, freecoursedetail, getallcreator, getonecreator, latestcourse, paidcourse, paidcoursedetail, searchcourse, searchcreator, userlogin, userlogout, userregister, userresendotp, userverfiyemail } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/usertoken.middleware.js";
// import { userwritereview } from "../controllers/review.controller.js";
const router = Router()


router.get("/ping", (req, res) => {
  res.json({ message: "Ping successful!" });
});

router.route("/register").post(userregister)
router.route("/login").post(userlogin)
router.route("/logout").post(verifyJWT,userlogout)
router.route("/emailverfication").post(userverfiyemail)
router.route("/newotp").post(userresendotp)
router.route("/searchcreatorname").post(searchcreator)
router.route("/searchcoursename").post(searchcourse)
router.route("/latestcourse").get(latestcourse)
router.route("/showallcreator").get(getallcreator)
router.route("/paidcourse").get(paidcourse)
router.route("/freecourse").get(freecourse)
router.route("/getcoursefree/:id").get(freecoursedetail)
router.route("/getcoursepaid/:id").get(paidcoursedetail)
router.route("/getcreatorprofile/:id").get(getonecreator)
// router.route("/writereview").post(verifyJWT,userwritereview)
export default router