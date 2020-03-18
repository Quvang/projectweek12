module.exports = {
    retrieveAllCountries(req, res, next) {
        const mongoose = require('mongoose');
        const dbname = 'world';
        const constr = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoose.connect(constr, conparam);
        let query = {};
        mongoose.connect(constr, { useNewUrlParser: true, useUnifiedTopology: true }, function(error, con) {
            if (error) {
                throw error;
            }

            const db = mongoose.connection; // make dbname the current db
            db.collection('country')
                .find(query)
                .toArray(function(err, country) {
                    if (err) {
                        throw err;
                    }
                    res.render('country', { title: 'My Country site', country });
                });
        });
    },

    retrieveChosenCountry(req, res, next) {
        const mongoose = require('mongoose');
        const dbname = 'world';
        const constr = `mongodb://localhost:27017/${dbname}`;
        const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoose.connect(constr, conparam);
        let query = {};
        mongoose.connect(constr, { useNewUrlParser: true, useUnifiedTopology: true }, function(error, con) {
            if (error) {
                throw error;
            }

            const db = mongoose.connection; // make dbname the current db
            db.collection('country')
                .find({ name: req.body.land })
                .toArray(function(err, country) {
                    if (err) {
                        throw err;
                    }
                    console.log(country);
                    res.render('countryDisplay', { title: 'My Country site', country });
                });
        });
    }
};
