import User from "../models/User.js";

class UserRepository {
    async create(itemObject) {
        return await User.create(itemObject);
    }

    async getAll() {
        return await User.find();
    }

    async findOneByEmail(email) {
        return await User.findOne({email}).select('+password')
    }

    async getOne(id) {
        if (!id) {
            throw new Error("Не указан ID");
        }
        return await User.findById(id);
    }

    async delete(id) {
        if (!id) {
            throw new Error("Не указан ID");
        }
        return await User.findByIdAndDelete(id);
    }

    async filter(obj) {
        return await User.find(obj);
    }

    async updateStatus(id, isActive) {
        if (!id) {
            throw new Error("Не указан ID");
        }

        return await User.findByIdAndUpdate(id, { isActive }, { new: true });
    }
}

export default new UserRepository();
