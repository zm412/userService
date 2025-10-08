import User from "../models/User.js";
import mongoose from "mongoose";
import type { UserItem } from "../types/userServiceTypes.js";

class UserRepository {
    async create(itemObject: UserItem) {
        const user = await User.create(itemObject);
        const { password, ...safe } = user.toObject();

        return safe;
    }

    async getAll() {
        return await User.find().lean();
    }

    async findOneByEmail(email: string) {
        return await User.findOne({ email }).select("+password");
    }

    async getOne(id: string) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }

        return await User.findById(id).lean();
    }

    async updateStatus(id: string, isActive: boolean) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }

        return await User.findByIdAndUpdate(id, { isActive }, { new: true });
    }

    throwError(message: string) {
        const error = new Error(message);
        throw error;
    }
}

export default new UserRepository();
