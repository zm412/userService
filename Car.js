const mongoose = require("mongoose")

const Car = new mongoose.Schema({
    brand: String,
    model: String,
    year: Date,
    color: String,
    price: Number,
    isClear: Boolean,
    registered: { type: Date, default: Date.now }, 
});

const newSchema = mongoose.model('Car', Car)
module.exports = newSchema 
