"use strict";
/*
 * wrapper for CRUD functionality of a mongodb with mongoose
 */
const mongoose = require('mongoose');



// mongoose.set('debug', true);
// mongoose.set('debug', { color: false });

const conparam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

exports.retrieve = async function(url, dbn, obj, query, sort) {
    const constr = `mongodb://${url}:27017/${dbn}`;
    await mongoose.connect(constr, conparam);
    const db = mongoose.connection;
    let stuff = null;
    try {
        stuff = await obj.find(query, null, sort);
    } catch(err) {
        console.log(error);
    } finally {
        db.close();
        return stuff;
    }
}

exports.upsert = async function(url, dbn, obj, query, chk) {
    const constr = `mongodb://${url}:27017/${dbn}`;
    await mongoose.connect(constr, conparam);
    const db = mongoose.connection;
    let stuff = null;
    let newquery = query.toObject();            // ny
    delete newquery._id;                        // ny
    try {
      stuff = await obj.updateOne(chk, newquery, {        // ændret
      upsert: true                                        // 1 linje fjernet, må sikkert gerne være der
      });
    //try {
    //    stuff = await obj.updateOne(chk, query, {
    //        upsert: true,
    //        new: true
    //    });
    } catch(err) {
        console.log(error);
    } finally {
        db.close();
        return stuff;
    }
}

//Sletter efter name - testet :-)
exports.remove = async function(url, dbn, obj, name) {
    const constr = `mongodb://${url}:27017/${dbn}`;
    await mongoose.connect(constr, conparam);
    const db = mongoose.connection;
    let stuff = null;
    try {
        stuff = await obj.deleteOne(name, (err) => {});
        console.log("Successful deletion");
    } catch(err) {
        console.log(error);
    } finally {
        db.close();
        return stuff;
    }
}
