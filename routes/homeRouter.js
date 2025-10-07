import express from "express";
import homeController from "../controllers/homeController.js";

const homeRouter = express.Router();
 
homeRouter.get("/about", homeController.about);
homeRouter.get("/", homeController.index);

export default homeRouter;
