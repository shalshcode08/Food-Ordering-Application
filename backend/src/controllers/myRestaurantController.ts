import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';

// get restaurnt api //
const getMyRestaurant = async( req: Request, res : Response) => {
  try {
    const restaurant = await Restaurant.findOne({user : req.userId})
    if(!restaurant){
      res.status(404).json({
        message : "restaurant not found"
      })
      return;
    }
    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message : "error geting restaurant"
    })
    return;
  }
}

// creating restaurant api //
const createMyRestaurant = async (req: Request, res: Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId });

        if (existingRestaurant) {
            res.status(409).json({ message: "User restaurant already exists" });
            return;
        }

        const imageUrl = await uploadImage(req.file as Express.Multer.File);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();

        res.status(201).send(restaurant);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
        return;
    }
};
  
// update restaurant api //
const updateMyRestaurant = async(req : Request, res : Response) => {
  try {
    const restaurant = await Restaurant.findOne({
      user : req.userId
    })
    if(!restaurant){
      res.status(404).json({
        message : "Restaurant not found"
      })
      return;
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();

    if(req.file){
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    res.status(200).send(restaurant);

  } catch (error) {
    console.log(error);
    res.status(500).json("Unable to update restaurant");
    return;
  }
}


const uploadImage = async (file: Express.Multer.File) => {
  try {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    return uploadResponse.url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};

export default {
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant
  };
