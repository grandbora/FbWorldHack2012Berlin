module.exports = function(app, express) {

	// Configuration
	app.configure(function() {

		app.use(express.static(__dirname + '/../public'));
		app.set('views', __dirname + '/../views');
		app.set('view engine', 'ejs');

		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session(GLOBAL.globalConfig.session));
		app.use(express.errorHandler(GLOBAL.globalConfig.errorHandler));
	});
};