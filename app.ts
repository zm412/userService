import express from "express";
import mongoose from "mongoose";

// Import Classes for Composition
import User from "./models/User.js";
import UserRepositoryClass from "./repositories/userRepository.js";

import AuthMiddlewareClass from "./middlewares/authMiddleware.js";

import UserServiceClass from "./services/userService.js";
import AuthServiceClass from "./services/authService.js";

import UserControllerClass from "./controllers/userController.js";
import AuthControllerClass from "./controllers/authController.js";

import createUserRouter from "./routes/userRouter.js";
import createAuthRouter from "./routes/authRouter.js";

// --- DEPENDENCY COMPOSITION ---
// 1. Instantiate Repository
const userRepository = new UserRepositoryClass(User);

// 2. Instantiate Services
const userService = new UserServiceClass(userRepository);
const authService = new AuthServiceClass(userRepository);

// 3. Instantiate Middleware (Inject Service)
const authMiddleware = new AuthMiddlewareClass(authService);

// 4. Instantiate Controllers
const userController = new UserControllerClass(userService);
const authController = new AuthControllerClass(authService);

// 5. Create Routers (Inject Controllers)
const userRouter = createUserRouter(userController, authMiddleware);
const authRouter = createAuthRouter(authController);

const app = express();

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/usersdb");
        app.listen(3000, () => console.log("Сервер ожидает подключения..."));
    } catch (err) {
        console.log(err);
    }
}

app.use(express.json());

app.use("/api", authRouter);
app.use("/api/users", userRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

main();

process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});
