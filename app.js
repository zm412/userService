import express from 'express'
import mongoose from 'mongoose'
import userRouter from "./routes/userRouter.js";
import homeRouter from "./routes/homeRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

const Schema = mongoose.Schema;
  
async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/usersdb");
        app.listen(3000, () => console.log("Сервер ожидает подключения..."));
    } catch (err) {
        console.log(err);
    }
}

app.use(express.static("public"));
app.use(express.json());
 
app.use("/api", authRouter);;
app.use("/api/users", userRouter);;
app.use("/", homeRouter);
 
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

main();
 
process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();
});

