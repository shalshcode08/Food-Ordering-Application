import express from "express"
import myUserConrroller from "../controllers/myUserConrroller";

const router = express.Router();

//if we get a request on '/api/my/user' it will transfer it to the the myUserController that will handle the logic
router.post('/', myUserConrroller.createCurrentUser)

export default router;