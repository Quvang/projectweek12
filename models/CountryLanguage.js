const mongoose = require("mongoose");

const countrylanguageSchema = mongoose.Schema({
    oldid: Number,
    countrycode: String,
    language: String,
    isofficial: String,
    percentage: Number
});

module.exports = mongoose.model("CountryLanguage", countrylanguageSchema, 'countrylanguage');
