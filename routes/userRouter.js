import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const { authenticate, requireRole, requireSelfOrAdmin } = authMiddleware
console.log( authenticate, requireRole, requireSelfOrAdmin , 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')

const userRouter = express.Router();

userRouter.get("/", authenticate, requireRole(["admin"]), userController.getUsers);
userRouter.get("/:id", authenticate, requireSelfOrAdmin(), userController.getUser);
userRouter.patch("/:id/block", authenticate, requireSelfOrAdmin(), userController.blockUser);

export default userRouter;
