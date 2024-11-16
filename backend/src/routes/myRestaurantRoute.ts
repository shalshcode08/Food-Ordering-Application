import express from "express";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import myRestaurantController from "../controllers/myRestaurantController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get('/order', jwtCheck, jwtParse, myRestaurantController.getMyRestaurantOrders)

router.get("/", jwtCheck, jwtParse, myRestaurantController.getMyRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  myRestaurantController.updateMyRestaurant
);

export default router;
