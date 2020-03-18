var express = require('express');
var router = express.Router();
/* Scheamas */
const modContinent = require('../models/handleContinents');
const modCountry = require('../models/handleCountries');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'World MAP' });
});

/* GET Country page. */
router.get('/country', async function(req, res, next) {
    let country = await modCountry.getCountries({}, { sort: { name: 1 } });
    res.render('country', { title: 'My Country site', country: country });
});

/* POST Country PAGE */

/*router.post('/country', function(req, res, next) {
      worldHandler.retrieveChosenCountry(req, res, next);
      res.render('index', { title: 'Leg Med Express' });
});*/

/* GET City page. */
router.get('/city', function(req, res, next) {
    res.render('city', { title: 'My Cities site' });
});

/* GET Language page. */
router.get('/language', function(req, res, next) {
    res.render('language', { title: 'My Language site' });
});

/* GET Continents page. */
router.get('/continent', async function(req, res, next) {
    let continents = await modContinent.getContinents({}, { sort: { name: 1 } });
    res.render('continent', { title: 'My Continent site', continents: continents });
    /* res.json(continents); */ //comment out res.render to view BSON File
});

/* GET Government page. */
router.get('/governmentform', function(req, res, next) {
    res.render('governmentform', { title: 'My Government Site' });
});

module.exports = router;
