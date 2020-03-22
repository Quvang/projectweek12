var express = require('express');
var router = express.Router();
/* Scheamas */
const modContinent = require('../models/handleContinents');
const modCountry = require('../models/handleCountries');
const modCities = require('../models/handleCities');
const modLanguage = require('../models/handleLanguages');
const modGovernmentForm = require('../models/handleGovernmentForms');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Map of the World' });
});

/* GET Country page. */
router.get('/country', async function(req, res, next) {
    let country = await modCountry.getCountries({}, { sort: { name: 1 } });
    res.render('country', { title: 'Country Data', country: country });
});

router.get('/city', async function(req, res, next) {
    res.render('city', { title: 'City Data' });
});

router.get('/continents', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, { sort: { name: 1 } });
    res.json(continents);
});

router.get('/countries/:cont', async function(req, res, next) {
    let countries = await modCountry.getCountries({ continent: req.params.cont }, { sort: { name: 1 } });
    res.json(countries);
});

router.get('/cities/:city', async function(req, res, next) {
    let cities = await modCities.getCities({ countrycode: req.params.city }, { sort: { name: 1 } });
    res.json(cities);
});

/* Create */
router.get('/create', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, { sort: { name: 1 } });
    let governmentforms = await modGovernmentForm.getGovernmentForms({}, { sort: { name: 1 } });
    let cities = await modCities.getCities({}, { sort: { countrycode: 1 } }); //Find a fix for removing duplicates
    res.render('create', {
        title: 'Create',
        continents,
        governmentforms,
        cities
    });
});

/* Create Continent after Submit*/
router.post('/createContinent', function(req, res, next) {
    modContinent.postContinent(req);
    res.redirect('/createContinentReceipt');
});

/* Create Continent Receipt */
router.get('/createContinentReceipt', async function(req, res, next) {
    res.render('createContinentReceipt', { title: 'Continent Data' });
});

/* Create Country after Submit*/
router.post('/createCountry', function(req, res, next) {
    modCountry.postCountry(req);
    res.redirect('/createCountryReceipt');
});

/* Create Country Receipt */
router.get('/createCountryReceipt', async function(req, res, next) {
    res.render('createCountryReceipt', { title: 'Country Data' });
});

/* Create Country after Submit*/
router.post('/createCity', function(req, res, next) {
    modCities.postCity(req);
    res.redirect('/createCityReceipt');
});

/* Create Country Receipt */
router.get('/createCityReceipt', async function(req, res, next) {
    res.render('createCityReceipt', { title: 'City Data' });
});

/* Create Language after Submit*/
router.post('/createLanguage', function(req, res, next) {
    modLanguage.postLanguage(req);
    res.redirect('/createLanguageReceipt');
});

/* Create Country Receipt */
router.get('/createLanguageReceipt', async function(req, res, next) {
    res.render('createLanguageReceipt', { title: 'Language Data' });
});

/* Create GovernmentForm after Submit*/
router.post('/createGovernmentForm', function(req, res, next) {
    modGovernmentForm.postGovernmentForm(req);
    res.redirect('/createGovernmentFormReceipt');
});

/* CreateGovernmentForm Receipt */
router.get('/createGovernmentFormReceipt', async function(req, res, next) {
    res.render('createGovernmentFormReceipt', { title: 'Governmentform Data' });
});

/* Keep this part of the code at the buttom. */
/* Click on continent Europe. */
router.get('/:cont', async function(req, res, next) {
    let showcountry = await modCountry.getCountries({ continent: req.params.cont }, { sort: { name: 1 } });
    res.render('continentview', { title: 'Country Data', showcountry: showcountry });
});

module.exports = router;
