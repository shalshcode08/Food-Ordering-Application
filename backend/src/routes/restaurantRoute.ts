import express from "express";
import { param } from "express-validator";
import restaurantController from "../controllers/restaurantController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .isEmpty()
    .withMessage("City parameter must be a valid string"),
    restaurantController.searchRestaurant
);

export default router;
