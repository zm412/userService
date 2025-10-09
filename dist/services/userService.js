class UserService {
    constructor(repository) {
        this.userRepository = repository;
        this.getUserById = this.getUserById.bind(this);
        this.listUsers = this.listUsers.bind(this);
        this.blockUser = this.blockUser.bind(this);
    }
    async getUserById(targetId) {
        const user = await this.userRepository.getOne(targetId);
        return this.sanitize(user);
    }
    async listUsers() {
        const users = await this.userRepository.getAll();
        return users.map((user) => this.sanitize(user));
    }
    async blockUser(id) {
        const user = await this.userRepository.updateStatus(id, false);
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
export default UserService;
