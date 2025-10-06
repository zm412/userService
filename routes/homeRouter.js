import express from "express";
import HomeController from "../controllers/HomeController.js";

const homeRouter = express.Router();
 
homeRouter.get("/about", HomeController.about);
homeRouter.get("/", HomeController.index);

export default homeRouter;
