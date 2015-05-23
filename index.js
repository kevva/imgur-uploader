'use strict';
var got = require('got');

module.exports = function (buf, cb) {
	got.post('https://api.imgur.com/3/image', {
		headers: {Authorization: 'Client-ID 34b90e75ab1c04b'},
		body: buf
	}, function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, JSON.parse(res));
	});
};
