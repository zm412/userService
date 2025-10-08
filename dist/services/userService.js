import userRepository from "../repositories/userRepository.js";
class UserService {
    async getUserById(targetId) {
        const user = await userRepository.getOne(targetId);
        return this.sanitize(user);
    }
    async listUsers() {
        const users = await userRepository.getAll();
        return users.map((user) => this.sanitize(user));
    }
    async blockUser(id) {
        const user = await userRepository.updateStatus(id, false);
        if (!user) {
            const error = new Error("Пользователь не найден");
            throw error;
        }
        return this.sanitize(user);
    }
    sanitize(user) {
        if (user) {
            const { password, ...safe } = user;
            return safe;
        }
        return user;
    }
}
export default new UserService();
