const mongoose = require("mongoose");

const governmentformSchema = mongoose.Schema({
    name: String,
});

module.exports = mongoose.model("GovernmentForm", governmentformSchema, 'governmentform');
