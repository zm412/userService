import {
    IUser,
    IUserService,
    IUserRepository,
} from "../types/userServiceTypes.js";

class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.userRepository = repository;
        this.getUserById = this.getUserById.bind(this);
        this.listUsers = this.listUsers.bind(this);
        this.blockUser = this.blockUser.bind(this);
    }

    async getUserById(targetId: string) {
        const user = await this.userRepository.getOne(targetId);

        return this.sanitize(user);
    }

    async listUsers() {
        const users = await this.userRepository.getAll();
        return users.map((user: IUser) => this.sanitize(user));
    }

    async blockUser(id: string) {
        const user = await this.userRepository.updateStatus(id, false);

        if (!user) {
            const error = new Error("Пользователь не найден");
            throw error;
        }

        return this.sanitize(user);
    }

    sanitize(user: IUser | null) {
        if (user) {
            const { password, ...safe } = user;
            return safe;
        }

        return user;
    }
}

export default UserService;
