'use strict';
const mon = require('./mongooseWrap');
const City = require('./City');

exports.getData = async function(sort) {
    if (sort === null)
        sort = {sort: {name: 1}};
    try {
        let cs = await mon.retrieve("localhost", "world", City, que, sort);
        return cs;
    } catch (e) {
        console.log(e);
    }
}