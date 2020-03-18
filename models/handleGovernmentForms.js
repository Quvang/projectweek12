"use strict";
const mon = require("./mongooseWrap");
const GovernmentForm = require("./GovernmentForm");

exports.getGovernmentForms = async function (req, res, next) {
    try {
        let gf = await mon.retrieve("localhost", "world", GovernmentForm, {});
        return gf;
    } catch (e) {
        console.log(e);
    }
}