const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
    oldid: Number,
    name: String,
    countrycode: String,
    district: String,
    population: Number
});

module.exports = mongoose.model("City", citySchema, 'city');