import { Request, Response } from "express";
import { IUserService, IUserController } from "../types/userServiceTypes.js";

class UserController implements IUserController {
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
        this.getUser = this.getUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.blockUser = this.blockUser.bind(this);
    }

    // 3. Controller method for getting all users
    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.listUsers();
            res.json(users);
        } catch (e: any) {
            console.error("Error:", e);
            res.status(500).send({
                error: "Ошибка при получении пользователей",
            });
        }
    }
    // 2. Controller method for getting a single user
    async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
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

    // 4. Controller method for blocking a user
    async blockUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userService.blockUser(id);
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

export default UserController;
