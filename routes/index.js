const worldHandler = require("../handler/handler");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'World MAP' });
});

/* GET Country page. */
router.get('/country', function(req, res, next) {
      //worldHandler.retrieveAllCountries(req, res, next);  // get data from
      res.render('country', { title: 'Country' });
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
router.get('/continent', function(req, res, next) {
      res.render('continent', { title: 'My Continent Site' });
});

/* GET Government page. */
router.get('/governmentform', function(req, res, next) {
      res.render('governmentform', { title: 'My Government Site' });
});

module.exports = router;
