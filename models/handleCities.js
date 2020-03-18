"use strict";
const mon = require("./mongooseWrap");
const City = require("./City");

exports.getCities = async function (que, sort) {
    try {
        let cs = await mon.retrieve("localhost", "world", City, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.findNamesakes = async function (arr) {
    let narr = [];
    for (let i = 0; i < arr.length; i++) {
        if (i < (arr.length - 1) && arr[i].name === arr[i+1].name) {
            narr.push({name: arr[i].name, countrycode: arr[i].countrycode, district: arr[i].district});
        }
        else if (i > 0 && arr[i].name === arr[i-1].name) {
            narr.push({name: arr[i].name, countrycode: arr[i].countrycode, district: arr[i].district});
        }
    }
    return narr;
}