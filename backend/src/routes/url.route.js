import express from "express";
import urlController from "../controllers/url.controller.js";
import { checkIsLoggedIn } from "../middlewares/auth.middleware.js";

const urlRouter = express.Router();

 urlRouter.post("/shrink",checkIsLoggedIn, urlController.shrink);
urlRouter.get("/redirect/:id", urlController.redirect);

 urlRouter.post("/views/:id", checkIsLoggedIn,urlController.views);

export default urlRouter;