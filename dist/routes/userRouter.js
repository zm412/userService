import express from "express";
// This function acts as a "factory" for the router
export default function createUserRouter(userController, authMiddleware) {
    const userRouter = express.Router();
    const { authenticate, requireRole, requireSelfOrAdmin } = authMiddleware;
    userRouter.get("/", authenticate, requireRole(["admin"]), userController.getUsers);
    userRouter.get("/:id", authenticate, requireSelfOrAdmin(), userController.getUser);
    userRouter.patch("/:id/block", authenticate, requireSelfOrAdmin(), userController.blockUser);
    return userRouter;
}
