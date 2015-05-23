'use strict';
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
