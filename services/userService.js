import userRepository from "../repositories/userRepository.js";

class UserService {
    async getUserById(targetId) {
        const user = await userRepository.getOne(targetId);

        return this.sanitize(user);
    }

    async listUsers() {
        return await userRepository.getAll();
    }

    async blockUser(id) {
        const user = await userRepository.updateStatus(
            id,
            false
        );

        if (!user) {
            const error = new Error("Пользователь не найден");
            error.status = 404;
            throw error;
        }

        return this.sanitize(user);
    }

    sanitize(user) {
        const { password, __v, ...safe } = user.toObject
            ? user.toObject()
            : user;

        return safe;
    }
}

export default new UserService();
