import User from "../models/User.js";
import userService from "../services/userService.js";

class UserController {
    async addUser(req, res) {
        try {
            const { fullName, birthDate, email, password, role } = req.body;
            const newUser = new User({ fullName, birthDate, email, password, role });
            await newUser.save();
            res.status(201).send(newUser);
        } catch (error) {
            console.error("Error adding user:", error);
            res.status(500).send({
                error: "Ошибка при добавлении пользователя",
            });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
            
            res.status(500).send({
                error: "Ошибка при получении пользователей",
            });

        }

        /*
        try {
            const users = await userService.listUsers(req);
            res.send(users);
        } catch (error) {
            if (error.message === "Only admin can view user list") {
                return res.status(403).send({ error: error.message });
            }
            
            res.status(500).send({
                error: "Ошибка при получении пользователей",
            });
        }
        */
    }

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
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
            const user = await User.findByIdAndUpdate(
                id,
                { isActive: false },
                { new: true },
            );
            if (!user)
                return res
                    .status(404)
                    .send({ error: "Пользователь не найден" });
            res.send({ message: "Пользователь заблокирован", user });
        } catch (error) {
            console.error("Error blocking user:", error);
            res.status(500).send({
                error: "Ошибка при блокировке пользователя",
            });
        }
    }
}

export default new UserController();
