'use strict';
const mon = require('./mongooseWrap');
const City = require('./City');

exports.getCities = async function(que, sort) {
    if (sort === null) sort = { sort: { name: 1 } };
    try {
        let cs = await mon.retrieve('localhost', 'world', City, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
};

exports.delCities = async function (name) {
    try {
        let cs = await mon.remove("localhost", "world", City, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.findNamesakes = async function(arr) {
    let narr = [];
    for (let i = 0; i < arr.length; i++) {
        if (i < arr.length - 1 && arr[i].name === arr[i + 1].name) {
            narr.push({ name: arr[i].name, countrycode: arr[i].countrycode, district: arr[i].district });
        } else if (i > 0 && arr[i].name === arr[i - 1].name) {
            narr.push({ name: arr[i].name, countrycode: arr[i].countrycode, district: arr[i].district });
        }
    }
    return narr;
};

exports.postCity = async function(req) {
    let chk = { name: req.body.name }; // check object for existence
    let city = new City({
        // create obejct in db-format
        name: req.body.name,
        countrycode: req.body.countrycode,
        district: req.body.district,
        population: req.body.population
    });
    if (req.body.localname === '') city.localname = city.name;
    try {
        let cs = await mon.upsert('localhost', 'world', City, city, chk);
        return;
    } catch (e) {
        console.log(e);
    }
};
