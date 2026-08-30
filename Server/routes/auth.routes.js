import googleAuth from "../controller/auth.controller.js"
import verifyToken from "../middleware/verifyToken.js"
import {getAllUsers, getProfile, getUserById} from "../controller/profile.controller.js"
import {getMessage,putMessage } from "../controller/message.controller.js"
import express from "express"


const router = express.Router()

router.post("/google",googleAuth)
router.get("/profile", verifyToken ,getProfile)
router.get("/users",getAllUsers)
router.get("/user_id/:userId",getUserById)
router.post("/message/put/msg",verifyToken,putMessage)
router.get("/message/get/msg",verifyToken,getMessage)

export default router