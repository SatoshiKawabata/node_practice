var posts = [
	{title : 'title0', body : 'body0'},
	{title : 'title1', body : 'body1'},
	{title : 'title2', body : 'body2'},
	{title : 'title3', body : 'body3'}
];

exports.index = function(req, res) {
	res.render('posts/index', {posts : posts});
};

exports.show = function(req, res) {
	res.render('posts/show', {post : posts[req.params.id]});
};

exports.new = function(req, res) {
	res.render('posts/new');
};

exports.create = function(req, res) {
	var post = {
		title : req.body.title,
		body : req.body.body
	};
	posts.push(post);
	res.render('posts/create', {post : post});
};

exports.edit = function(req, res) {
	res.render('posts/edit', {
		post : posts[req.params.id], 
		id : req.params.id
	});
};

exports.update = function(req, res, next) {
	if (req.body.id !== req.params.id) {
		next(new Error('ID not valid'));
		return;
	}
	var id = req.body.id;
	var post = {
		title : req.body.title,
		body : req.body.body
	};
	posts[id] = post;
	res.redirect('/');
};

exports.destroy = function(req, res, next) {
	if (req.body.id !== req.params.id) {
		next(new Error('ID not valid'));
		return;
	}
	var id = req.body.id;
	posts.splice(id, 1);
	res.render('posts/destroy');
};