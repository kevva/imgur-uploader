'use strict';
var concatStream = require('concat-stream');
var condenseKeys = require('condense-keys');
var got = require('got');

module.exports = function (buf, cb) {
	got.post('https://api.imgur.com/3/image', {
		json: true,
		headers: {authorization: 'Client-ID 34b90e75ab1c04b'},
		body: buf
	}, function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		res = condenseKeys(res.data);
		res.date = new Date(res.datetime * 1000);
		delete res.datetime;
		cb(null, res);
	});
};

module.exports.stream = function () {
	var concat = concatStream(end);
	var stream = got.post('https://api.imgur.com/3/image', {
		headers: {authorization: 'Client-ID 34b90e75ab1c04b'}
	});

	function end(res) {
		res = condenseKeys(JSON.parse(res).data);
		res.date = new Date(res.datetime * 1000);
		delete res.datetime;
		stream.emit('upload', res);
	}

	stream.pipe(concat);
	return stream;
};
