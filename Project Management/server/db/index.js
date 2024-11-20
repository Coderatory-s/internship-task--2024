const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://mushtaqali:mushtaqali1246@mushtaq.gunsc.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, })
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;