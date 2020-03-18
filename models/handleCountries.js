"use strict";
const mon = require("./mongooseWrap");
const Country = require("./Country");

exports.getCountries = async function (que, sort) {
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let cs = await mon.retrieve("localhost", "world", Country, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.postCountry = async function (req) {
    let chk = { name: req.body.name };  // check object for existence
    let country = new Country({                     // create obejct in db-format
        code: req.body.code,
        name: req.body.name,
        continent: req.body.continent,
        region: req.body.region,
        surfacearea: req.body.surfacearea,
        indepyear: req.body.indepyear,
        population: req.body.population,
        lifeexpectancy: req.body.lifeexpectancy,
        gnp: req.body.gnp,
        gnpold: req.body.gnpold,
        localname: req.body.localname,
        governmentform: req.body.governmentform,
        headofstate: req.body.headofstate,
        capital: null,
        code2: req.body.code2
    });
    if (req.body.localname === "") country.localname = country.name;
    try {
        let cs = await mon.upsert("localhost", "world", Country, country, chk);
        return;
    } catch (e) {
        console.log(e);
    }
}