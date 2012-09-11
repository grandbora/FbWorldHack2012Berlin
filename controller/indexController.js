var fb = require('fb');
var solr = require('solr');
var solrClient = solr.createClient(GLOBAL.globalConfig.solr);

module.exports = function(app) {

	app.get('/index/login', function(req, res) {
		var targetUrl = "https://www.facebook.com/dialog/oauth";
		targetUrl += "?client_id=" + GLOBAL.globalConfig.facebook.app_id;
		targetUrl += "&scope=" + GLOBAL.globalConfig.facebook.scope;
		targetUrl += "&redirect_uri=" + GLOBAL.globalConfig.app_url + "/index";
		res.redirect(targetUrl);
	});

	app.get('/index*', function(req, res, next) {

		if (undefined !== req.query.code) {

			fb.api('oauth/access_token', {
				client_id : GLOBAL.globalConfig.facebook.app_id,
				client_secret : GLOBAL.globalConfig.facebook.secret,
				code : req.query.code,
				redirect_uri : GLOBAL.globalConfig.app_url + "/index"
			}, function (data) {
				fb.setAccessToken(data.access_token);
				res.cookie('fb_access_token', data.access_token);
				next();
			});
			return;
		}

		if (undefined !== req.cookies['fb_access_token']) {
			fb.setAccessToken(req.cookies['fb_access_token']);
			next();
			return ;
		}

		res.redirect('/index/login');
	});

	app.get('/index', function(req, res) {

		// if (req.query.fb_action_ids){
		// 	var fbActionIdList = req.query.fb_action_ids.split(',');
		// 	for (var i = 0; i < fbActionIdList.length; i++) {

		// 		fb.setAccessToken(GLOBAL.globalConfig.facebook.app_id + '|' + GLOBAL.globalConfig.facebook.secret);
		// 		fb.api('/' + fbActionIdList[i], function (data) {
		// 			//console.log(data);
		// 			// fb.api(data['from']['id'] + '/' + GLOBAL.globalConfig.facebook.name_space + ':advertise', 'post', {
		// 			// 	product: data['data']['product']['ur']
		// 			// } , function (data) {
		// 			// 	console.log(data);
		// 			// });
		// 		});
		// 	};
		// };

		fb.api('me', function (data) {
			res.render('index/index', {
				me : data
			});
		});
	});

	app.get('/index/solr', function(req, res) {
		solrClient.get('select?wt=json&q=title:' + req.query.q + '*', function(err, data) {
			res.send(data);
		});
	});
};