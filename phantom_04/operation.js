// Headless ブラウザの生成
var page = require('webpage').create();

// URL を開く
page.open('http://www.google.co.jp', function(status) {
	// jQuery を使う
	page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
		var title = page.evaluate(function() {
			var title = $('title').text();
			return title;
		});
		console.log(title); // Google

		page.render('google.png');

		phantom.exit();
	});
});