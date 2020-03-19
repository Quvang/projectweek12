var express = require('express');
var router = express.Router();
/* Scheamas */
const modcontinents = require('../models/handleContinents');
const modCities = require('../models/handleCities');
const modCountry = require('../models/handleCountries');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Map of the World' });
});

/* Click on continent. */
router.get('/country/:cont', async function(req, res, next) {
    let country = await modCountry.getCountries({continent: req.params.cont}, { sort: { name: 1 } });
    res.render('country', { title: 'Country Data', country: country });
});

/* Chose Country - Show cities. */
router.get('/continent/country/:city', async function(req, res, next) {
    let cities = await modCities.getCities({countrycode: req.params.city}, { sort: { name: 1 } });
    res.json(cities);
});

/* GET Country page. */
router.get('/country', async function(req, res, next) {
    let country = await modCountry.getCountries({}, { sort: { name: 1 } });
    res.render('country', { title: 'Country Data', country: country });
});

/* GET City page. */
router.get('/city', function(req, res, next) {
    res.render('city', { title: 'City Data' });
});

module.exports = router;
