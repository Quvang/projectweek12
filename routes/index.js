var express = require('express');
var router = express.Router();
/* Scheamas */
const modContinent = require("../models/handleContinents");
const modCountry = require("../models/handleCountries");
const modCities = require("../models/handleCities");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Map of the World' });
});


/* GET Country page. */
router.get('/country', async function(req, res, next) {
    let country = await modCountry.getCountries({}, { sort: { name: 1 } });
    res.render('country', { title: 'Country Data', country: country });
});

router.get('/continents', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, {sort: {name: 1}});
    res.json(continents);
});

router.get('/countries/:cont', async function(req, res, next) {
    let countries = await modCountry.getCountries({continent: req.params.cont}, {sort: {name: 1}});
    res.json(countries);
});

router.get('/cities/:city', async function(req, res, next) {
    let cities = await modCities.getCities({countrycode: req.params.city}, {sort: {name: 1}});
    res.json(cities);
});

/* Click on continent Europe. */
router.get('/:cont', async function(req, res, next) {
    let showcountry = await modCountry.getCountries({continent: req.params.cont}, { sort: { name: 1 } });
    res.render('continentview', { title: 'Country Data', showcountry: showcountry });
});
/*

router.get('/cities/', async function(req, res, next) {
    let cities = await modCities.getCities({country: req.params.code}, {sort: {name: 1}});
    res.json(cities);
});
*/
/* GET City page. */
router.get('/city', function(req, res, next) {
    res.render('city', { title: 'City Data' });
});

module.exports = router;
