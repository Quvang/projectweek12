const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.set('debug', { color: false });

const countrySchema = mongoose.Schema({
    code: String,
    name: String,
    continent: String,
    region: String,
    surfacearea: Number,
    indepyear: Number,
    population: Number,
    lifeexpectancy: Number,
    gnp: Number,
    gnpold: Number,
    localname: String,
    governmentform: String,
    headofstate: String,
    capital: Number,
    code2: String
});

module.exports = mongoose.model("Country", countrySchema, 'country');
