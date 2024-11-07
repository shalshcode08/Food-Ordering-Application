import express from "express"
import myUserController from "../controllers/myUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

//if we get a request on '/api/my/user' it will transfer it to the the myUserController that will handle the logic
router.post('/', jwtCheck , myUserController.createCurrentUser);
router.put('/', jwtCheck, jwtParse, validateMyUserRequest, myUserController.updateCurrentUser);
router.get('/',jwtCheck,jwtParse, myUserController.getCurrentUser);

export default router;