import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/myUserRoute'


mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to Database"));

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/my/user", myUserRoute);




app.listen(3000, () => {
  console.log("App is running on PORT : 3000");
});
