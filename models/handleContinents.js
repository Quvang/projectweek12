'use strict';
const mon = require('./mongooseWrap');
const Continent = require('./Continent');

exports.getContinents = async function(sort) {
    try {
        let cs = await mon.retrieve('localhost', 'world', Continent, {}, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
};
