import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/create", userController.addUser);
userRouter.get("/", authMiddleware.roles(['admin']), userController.getUsers);
userRouter.get("/:id", userController.getUser);
userRouter.patch("/:id/block", userController.blockUser);

export default userRouter;
