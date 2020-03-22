'use strict';
const mon = require('./mongooseWrap');
const Continent = require('./Continent');

exports.getContinents = async function({}, sort) {
    try {
        let cs = await mon.retrieve('localhost', 'world', Continent, {}, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
};

exports.postContinent = async function(req) {
    let chk = { name: req.body.name }; // check object for existence
    let continent = new Continent({
        // create obejct in db-format
        name: req.body.name
    });
    if (req.body.localname === '') continent.localname = continent.name;
    try {
        let cs = await mon.upsert('localhost', 'world', Continent, continent, chk);
        return;
    } catch (e) {
        console.log(e);
    }
};
