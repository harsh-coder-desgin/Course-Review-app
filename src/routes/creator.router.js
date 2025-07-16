import {Router} from "express"
import { addsocialmedia, changecurrentpassword, editbio, editcreatorname, editprofilcreator, getcurrentuser, logincreator, logoutcreator, refreshaccesstoken, registercreator, resendotp, verfiyemail } from "../controllers/creator.controller.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/tokenverfiy.middleware.js"
const router = Router()

router.get("/ping", (req, res) => {
  res.json({ message: "Ping successful!" });
});

router.route("/register").post(upload.fields([{ name: 'profile', maxCount: 1 }]),registercreator)
router.route("/emailverfication").post(verfiyemail)
router.route("/newotp").post(resendotp)
router.route("/login").post(logincreator)
router.route("/logout").post(verifyJWT,logoutcreator)
router.route("/refreshtoken").post(verifyJWT,refreshaccesstoken)
router.route("/changepassword").post(verifyJWT,changecurrentpassword)
router.route("/getuser").get(verifyJWT,getcurrentuser)
router.route("/editprofile").patch(verifyJWT,upload.fields([{ name: 'profile', maxCount: 1 }]),editprofilcreator)
router.route("/editcreatorname").patch(verifyJWT,editcreatorname)
router.route("/editbio").patch(verifyJWT,editbio)
router.route("/addsoicalmedia").post(verifyJWT,addsocialmedia)
export default router