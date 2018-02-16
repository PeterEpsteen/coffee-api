const os = require('os');
const hostname = os.hostname();
const port = (hostname.indexOf('droplet') !== -1) ?
    5432 : 1111;
const cn = {
    host: 'localhost',
    port: port,
    database: 'coffee',
    user: 'coffee',
    password: 'coffee'
};
const pgp = require('pg-promise')();
const db = pgp(cn);

module.exports = db;