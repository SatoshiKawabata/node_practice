var express = require('express'),
	app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.static(__dirname + 'public/'));

app.param('id', function(req, res, next, id) {
	var users = ['A', 'B', 'C'];
	req.params.name = users[id];
	next();
});

app.get('/hello/:id', function(req, res) {
	// res.render('index', {title : 'タイトル'});
	res.send('hello ' + req.params.name);
});

app.get('/bye/:id', function(req, res) {
	// res.render('index', {title : 'タイトル'});
	res.send('bye ' + req.params.name);
});

app.get('/new', function(req, res) {
	res.render('new');
});

app.post('/create', function(req, res) {
	console.log(req.body);
	res.send(req.body.name);
});

app.listen(3000);
console.log('server starting...');