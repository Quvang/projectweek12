const mongoose = require("mongoose");

const continentSchema = mongoose.Schema({
    name: String,
});

module.exports = mongoose.model("Continent", continentSchema, 'continent');
