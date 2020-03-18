"use strict";
const mon = require("./mongooseWrap");
const CountryLanguage = require("./CountryLanguage");

exports.getLanguages = async function (que, sort) {
    try {
        let cs = await mon.retrieve("localhost", "world", CountryLanguage, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}

exports.mergeAndTally = async function (langs, ctrys, ranked) {
    let result = {};
    for (let country of ctrys) {                        // loop through ctrys of chosen continent
        for (let lang of langs) {                       // in loop find corresponding languages
            if (lang.countrycode === country.code) {
                if (!result[lang.language]) {           // if counter for lang not exists, create
                    result[lang.language] = Math.floor(lang.percentage * country.population / 100);
                } else {                                // if counter for lang exists, add to it
                    result[lang.language] += Math.floor(lang.percentage * country.population / 100);
                }
            }
        }
    }
                                                        // in order to sort
    var sortable = [];                                  // convert to array
    for (let lang in result) {
        sortable.push([lang, result[lang]]);
    }

    sortable.sort(function (a, b) {                     // sort array on values, descending
        return b[1] - a[1];
    });

    sortable.forEach(function (item) {                  // format numeric values for print
        item[1] = item[1].toLocaleString('da');
    });


    let sortedresult = [];                              // create output array
    let rankedone = [];
    sortable.forEach(function (item, i) {
        sortedresult.push({language: item[0], count: item[1], rank: (i+1) });
        if (ranked === item[0]) {
            rankedone.push({language: item[0], count: item[1], rank: (i+1) });
        }
    });
    if (rankedone.length === 1) {
        sortedresult = rankedone;
    }
    return sortedresult;
};

exports.findCountryInArr = async function () {};