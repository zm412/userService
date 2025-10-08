import User from "../models/User.js";
import mongoose from "mongoose";
class UserRepository {
    async create(itemObject) {
        const user = await User.create(itemObject);
        const { password, ...safe } = user.toObject();
        return safe;
    }
    async getAll() {
        return await User.find().lean();
    }
    async findOneByEmail(email) {
        return await User.findOne({ email }).select("+password");
    }
    async getOne(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }
        return await User.findById(id).lean();
    }
    async updateStatus(id, isActive) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            this.throwError("Не указан ID");
        }
        return await User.findByIdAndUpdate(id, { isActive }, { new: true });
    }
    throwError(message) {
        const error = new Error(message);
        throw error;
    }
}
export default new UserRepository();
