var http = require('http'),
	fs = require('fs'),
	ejs = require('ejs'),
	qs = require('querystring');
var settings = require('./settings');
var server = http.createServer();
var template = fs.readFileSync(__dirname + '/public_html/bbs.ejs', 'utf-8');
var posts = [];

function renderForm(posts, response) {
	var data = ejs.render(template, {
		posts : posts
	});
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(data);
	response.end();
}

server.on('request', function (request, response) {
	
	if (request.method === 'POST') {
		
		request.data = '';
		request.on('readable', function() {

			request.data += request.read();

		});

		request.on('end', function() {

			var query = qs.parse(request.data);
			posts.push(query.name);
			renderForm(posts, response);

		});

	} else {
		
		renderForm(posts, response);

	}
});
server.listen(settings.port, settings.host);
 
console.log('Server running at http://127.0.0.1:8124/');