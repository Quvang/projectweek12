'use strict';
const mon = require('./mongooseWrap');
const GovernmentForm = require('./GovernmentForm');

exports.getGovernmentForms = async function({}, sort, req, res, next) {
    try {
        let gf = await mon.retrieve('localhost', 'world', GovernmentForm, {}, sort);
        return gf;
    } catch (e) {
        console.log(e);
    }
};

exports.postGovernmentForm = async function(req) {
    let chk = { name: req.body.name }; // check object for existence
    let governmentForm = new GovernmentForm({
        // create obejct in db-format
        name: req.body.name
    });
    if (req.body.localname === '') continent.localname = continent.governmentForm;
    try {
        let cs = await mon.upsert('localhost', 'world', GovernmentForm, governmentForm, chk);
        return;
    } catch (e) {
        console.log(e);
    }
};
