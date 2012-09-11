// create global config instance
var configBuilder = require('konphyg')(__dirname + '/config');
GLOBAL.globalConfig = configBuilder('config');

var express = require('express');
var app = module.exports = express();

require(__dirname + '/config')(app, express);
require(__dirname + '/controller')(app);

app.listen(process.env.PORT);