var express = require('express');
var app = express();
var post = require('./routes/post');

// ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride()); // put, deleteを使えるようにするためのmiddleware
app.use(express.logger('dev'));
app.use(app.router);

// routing
app.get('/', post.index);	// 記事一覧
// app.get('/posts/new', post.new);	// 新規作成
// app.post('/posts/create', post.create);	// 作成完了
// app.get('/posts/:id', post.show);	// 記事詳細
// app.get('/posts/:id/edit', post.edit);	// 記事の編集
// app.put('/posts/:id', post.update);	// 記事の編集完了
// app.delete('/posts/:id', post.destroy);	// 記事の編集完了

app.listen(3000);
console.log('server starting ...');