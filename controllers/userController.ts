import { Request, Response } from "express";
import userService from "../services/userService.js";

class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.listUsers();
            res.json(users);
        } catch (e: any) {
            console.error("Error:", e);
            res.status(500).send({
                error: "Ошибка при получении пользователей",
            });
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            console.log(user, 'USER')
            if (!user)
                return res
                    .status(404)
                    .send({ error: "Пользователь не найден" });
            res.send(user);
        } catch (error: any) {
            console.error("Error fetching user:", error);
            res.status(500).send({
                error: "Ошибка при получении пользователя",
            });
        }
    }

    async blockUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.blockUser(id);
            res.status(200).json({
                message: "Пользователь заблокирован",
                user,
            });
        } catch (error: any) {
            console.error("Error blocking user:", error);
            const status = error.status || 500;
            const message =
                error.status === 404
                    ? "Пользователь не найден"
                    : "Ошибка при блокировке пользователя";

            res.status(status).send({ error: message });
        }
    }
}

export default new UserController();
