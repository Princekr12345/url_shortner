import express from "express";
import userRouter from "./user.route.js";
import urlRouter from "./url.route.js";

const indexRouter=express.Router();

indexRouter.use("/api/v1/users", userRouter);
indexRouter.use("/api/v1/urls", urlRouter);


export default indexRouter;