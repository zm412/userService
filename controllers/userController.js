import User from "../models/User.js";
import userService from "../services/userService.js";

class UserController {
    async getUsers(req, res) {
        try {
            const users = await userService.listUsers(req);
            res.json(users)
        } catch (e) {
            console.log(e)
            
            res.status(500).send({
                error: "Ошибка при получении пользователей",
            });

        }
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            console.log(user, 'USER')

            if (!user)
                return res
                    .status(404)
                    .send({ error: "Пользователь не найден" });
            res.send(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).send({
                error: "Ошибка при получении пользователя",
            });
        }
    }

    async blockUser(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.blockUser(id);
            res.send({ message: "Пользователь заблокирован", user });
        } catch (error) {
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
