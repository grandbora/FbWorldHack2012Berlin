module.exports = function(app) {

	var channelController = require(__dirname + '/channelController.js')(app);
	var indexController = require(__dirname + '/indexController.js')(app);
	var productController = require(__dirname + '/productController.js')(app);
};