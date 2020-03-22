var express = require('express');
var router = express.Router();
/* Scheamas */
const modContinent = require("../models/handleContinents");
const modCountry = require("../models/handleCountries");
const modCities = require("../models/handleCities");
const modLang = require("../models/handleLanguages"); 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Map of the World' });
});
/* GET Country page. */
router.get('/country', async function(req, res, next) {
    let country = await modCountry.getCountries({}, { sort: { name: 1 } });
    res.render('country', { title: 'Country Data', country: country });
});
/* GET City page. */
router.get('/city', async function(req, res, next) {
    res.render('city', { title: 'City Data'});
});
/* GET City page. */
router.get('/language', async function(req, res, next) {
    res.render('language', { title: 'Language'});
});
/* Show continents */
router.get('/continents', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, {sort: {name: 1}});
    res.json(continents);
});
/* Show Countries */
router.get('/countries/:cont', async function(req, res, next) {
    let countries = await modCountry.getCountries({continent: req.params.cont}, {sort: {name: 1}});
    res.json(countries);
});
/* Show Country data */
router.get('/countrydata/:country', async function(req, res, next) {
    let countries = await modCountry.getCountries({code: req.params.country}, {sort: {name: 1}});
    res.json(countries);
});
/* Show Cities */
router.get('/cities/:city', async function(req, res, next) {
    let cities = await modCities.getCities({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(cities);
});
/* Show City data */
router.get('/citydata/:city', async function(req, res, next) {
    let cities = await modCities.getCities({oldid: req.params.city}, {sort: {name: 1}});
    res.json(cities);
});
/* Show Languages */
router.get('/languages/:country', async function(req, res, next) {
    let Languages = await modLang.getLanguages({countrycode: req.params.country}, {sort: {name: 1}});
    res.json(Languages);
});
/* Click on continent to get countries */
router.get('/:cont', async function(req, res, next) {
    let showcountry = await modCountry.getCountries({continent: req.params.cont}, { sort: { name: 1 } });
    res.render('continentview', { title: 'Country Data', showcountry: showcountry });
});

module.exports = router;
