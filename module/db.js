var setting = require('../setting');
var mysql = require('mysql');
var con = mysql.createConnection(setting);
con.connect();
module.exports = con;