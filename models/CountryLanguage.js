const mongoose = require('mongoose');

const countrylanguageSchema = mongoose.Schema({
    oldid: Number,
    countrycode: String,
    language: String,
    isofficial: String,
    percentage: Number
});

module.exports = mongoose.model('CountryLanguage', countrylanguageSchema, 'countrylanguage');

exports.postLanguage = async function(req) {
    let chk = { language: req.body.name }; // check object for existence
    let language = new CountryLanguage({
        // create obejct in db-format
        name: req.body.name,
        language: req.body.name,
        countrycode: req.body.countrycode,
        isofficial: req.body.isofficial,
        percentage: req.body.percentage
    });
    if (req.body.localname === '') language.localname = language.name;
    try {
        let cs = await mon.upsert('localhost', 'world', CountryLanguage, language, chk);
        return;
    } catch (e) {
        console.log(e);
    }
};
