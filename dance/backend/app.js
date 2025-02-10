import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Local modules
import connectDb from "./db/db.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.routes.js";
import adminRouter from "./routes/admin.routes.js";
import becomeMentorRouter from "./routes/becomeMentor.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// MongoDB connection
connectDb();

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/admin", adminRouter);
app.use("/becomeMentor", becomeMentorRouter);

export default app;
