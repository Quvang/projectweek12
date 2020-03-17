"use strict";
const mongoose = require('mongoose');
const conparam = { useNewUrlParser: true, useUnifiedTopology: true};

exports.retrieve = async function(url, dbn, coll, query) {
    const constr = `mongodb://${url}:27017`;
    const con = await mongoose.connect(constr, conparam);
    const db = con.db(dbn);
    let stuff = null;
    try {
        stuff = await db.collection(coll).find(query).toArray();
    } catch(err) {
        console.log(error);
    } finally {
        con.close();
        return stuff;
    }
}

exports.upsert = async function(url, dbn, coll, query, chk) {
    const constr = `mongodb://${url}:27017`;
    const con = await mongoose.connect(constr, conparam);
    const db = con.db(dbn);
    let stuff = null;
    try {
        stuff = await db.collection(coll).updateOne(chk, {"$set": query}, {upsert: true});
    } catch(err) {
        console.log(error);
    } finally {
        con.close();
        return stuff;
    }
}
