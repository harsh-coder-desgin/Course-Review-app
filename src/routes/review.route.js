import {Router} from "express"
import { verifyJWT } from "../middlewares/usertoken.middleware.js";
import { alluserratingofcreatorreview, alluserratingofreview, autodeletereplyreport, 
  autodeletereport, deletereplycomment, deleteusercomment, editreplycomment, editusercomment, 
  getallcommentofreview, getallreplycomment, getcreatorreview, getonlyreply,
   latestreview, likereplycomment, likeusercomment, removedownvotes, removelikereview, removereplylike,
    removeupvotes, removeuserlikecomment, replycomment, reportreplycomment, reportusercomment, 
     showcurrentcoursereview, usercomment, userdownvotes, userlike, userupvotes, userwritereview } from "../controllers/review.controller.js";
const router = Router()


router.get("/ping", (req, res) => {
  res.json({ message: "Ping successful!" });
});

router.route("/userwritereview").post(verifyJWT,userwritereview)

//like 
router.route("/likereview").post(verifyJWT,userlike)
router.route("/removelike").post(verifyJWT,removelikereview)

//up-vote
router.route("/upvotereview").post(verifyJWT,userupvotes)
router.route("/removeupvotereview").post(verifyJWT,removeupvotes)

//down-vote
router.route("/downvotesreview").post(verifyJWT,userdownvotes)
router.route("/removedownvotesreview").post(verifyJWT,removedownvotes)

//user-comment
router.route("/writecommentreview").post(verifyJWT,usercomment)
router.route("/editcommentreview").patch(verifyJWT,editusercomment)
router.route("/likeusercomment").post(verifyJWT,likeusercomment)
router.route("/removelikeusercomment").post(verifyJWT,removeuserlikecomment)
router.route("/reportusercomment").post(verifyJWT,reportusercomment)
router.route("/autodeletereportcomment").post(autodeletereport)
router.route("/userdeletecomment").post(verifyJWT,deleteusercomment)

//reply-commet
router.route("/replycommentreview").post(verifyJWT,replycomment)
router.route("/editreplycommentreview").post(verifyJWT,editreplycomment)
router.route("/replylikereview").post(verifyJWT,likereplycomment)
router.route("/removelikreplyreview").post(verifyJWT,removereplylike)
router.route("/reportreply").post(verifyJWT,reportreplycomment)
router.route("/autoreportreply").post(autodeletereplyreport)
router.route("/deletereplycomment").post(verifyJWT,deletereplycomment)

//notification reply
// router.route("/getnotificationuser").get(verifyJWT,getnotificationuser)

//course-review print
router.route("/getcoursereview/:id").get(showcurrentcoursereview)
router.route("/getcommentofreview").post(getallcommentofreview)
router.route("/getallreplycomment").post(getallreplycomment)
router.route("/getallreply").post(getonlyreply)
router.route("/getuserrating/:id").post(alluserratingofreview)

//creator-review print
router.route("/getcreatorreview/:id").get(getcreatorreview)
router.route("/getratingcreator/:id").post(alluserratingofcreatorreview)

//latest review
router.route("/getlatestrreview").get(latestreview)
// router.route("/updateupvotereview").post(verifyJWT,updateupvotes)
// router.route("/updatedownvotesreview").post(verifyJWT,updatedownvotes)
// router.route("/updatecommentreview").post(verifyJWT,updatecommentreview)
// router.route("/updatereplycomment").post(updatereplycomment)


// router.route("/getreplycomment").post(showcurrentreplycomment)
// router.route("/replycommentreply").post(replycommenttoreply)

// // router.route("/getcoursereview/:id").get(showcurrentcoursereview)
// router.route("/getpariculatreviewcomment").post(showcommentofparticularreview)
export default router