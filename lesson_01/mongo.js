var MongoClient = require('mongodb').MongoClient,
	settings = require('./settings');

MongoClient.connect('mongodb://' + settings.host + '/' + settings.db, function(err, db) {

	if (err) { return console.dir(err); }

	console.log('connected to db');

	// コレクションの作成
	db.collection('users', function(err, collection){
		var docs = [
			{name : 'kawa', score : 40},
			{name : 'bata', score : 50},
			{name : 'hira', score : 80}
		];
		// collection.insert(docs, function(err, result) {
		// 	console.log(result);
		// });
		// collection.find({name:'kawa'}).toArray(function(err, items) {
		// 	console.log(items);
		// });
		var stream = collection.find().stream();
		stream.on('data', function(item) {
			console.log(item)
		});
		stream.on('end', function() {
			console.log('finished')
		});
	});
});