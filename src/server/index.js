import express from 'express';
import path from 'path';

var app = express();

app.use(express.static(path.join(__dirname, "..", "www")));

app.get("/", function(req, res) {
	res.send('hello');
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});