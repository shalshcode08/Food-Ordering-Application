import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';

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
    }
};

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
    createMyRestaurant,
};
