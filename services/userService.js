import userRepository from "../repositories/userRepository.js";

class UserService {
    async getUserById(requester, targetId) {
        if (requester.role !== "admin" && requester.id !== targetId)
            throw new Error("Access denied");

        const user = await userRepository.getOne(targetId);
        if (!user) throw new Error("User not found");

        return this.sanitize(user);
    }

    async listUsers(requesterRole) {
        if (requesterRole !== "admin")
            throw new Error("Only admin can view user list");

        return await userRepository.getAll();
    }

    async blockUser(requester, targetId, isActive) {
        if (requester.role !== "admin") throw new Error("Forbidden");

        const user = await userRepository.updateStatus(targetId, isActive);
        if (!user) throw new Error("User not found");

        return this.sanitize(user);
    }

    #sanitize(user) {
        const { password, __v, ...safe } = user.toObject
            ? user.toObject()
            : user;

        return safe;
    }
}

export default new UserService();
