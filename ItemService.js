const Car = require("./Car.js")

class ItemService {

    async create(itemObject) {
        return await Car.create(itemObject);
    }

    async getAll() {
        return await Car.find();
    }

    async getOne(id) {
        if (!id) {
            throw new Error('не указан ID')
        }
        
        return await Car.findById(id);
    }

    async delete(id) {
        if (!id) {
            throw new Error('не указан ID')
        }

        return await Car.findByIdAndDelete(id)
    }

    async filter(obj) {
        return await Car.find(obj)
    }
}

module.exports = new ItemService()
