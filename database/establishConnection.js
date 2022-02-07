'use strict';

const Mongoose = require('mongoose');
require('dotenv').config();
let cachedDb = null;

module.exports.connectToDatabase = async function () {
    if (cachedDb) {
        return Promise.resolve(cachedDb);
    }
    try {
        Mongoose.connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        Mongoose.set('debug', true);
        cachedDb = Mongoose.connection;
        cachedDb.on("error", function (err) {
            console.log('DB connection failed with error:', err);
        });
        cachedDb.once("open", function () {
            console.log('DB connected');
        });
        return cachedDb;
    } catch (e) {
        console.log("Error: Connection to DB Failed");
    }
}