module.exports = function(app) {
	app.get('/product', function(req, res) {
		res.render('product/product', {
			title : req.query.title,
			description : req.query.title,
			url : 'http://' + req.headers.host + req.url,
			image : req.query.image
		});
	});
};