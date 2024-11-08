import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/myUserRoute'
import cloudinary from "cloudinary";
import myRestaurantRoute from "./routes/myRestaurantRoute";


mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to Database"));

cloudinary.v2.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDNIARY_API_SECRET,
})

const app = express();
app.use(cors());
app.use(express.json());


app.get('/health', async(req : Request, res: Response)=> {
  res.send({
    message : "Health OK"
  })
})

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);


app.listen(3000, () => {
  console.log("App is running on PORT : 3000");
});
