import express from "express";
import UserController from "../controllers/UserController.js";
import {authenticate} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/create", UserController.addUser);
userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUser);
userRouter.patch("/:id/block", UserController.blockUser);

export default userRouter;
