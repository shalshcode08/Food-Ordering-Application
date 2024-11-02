import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "Hello from the express app",
  });
});

app.listen(3000, () => {
  console.log("App is running on PORT : 3000");
});
