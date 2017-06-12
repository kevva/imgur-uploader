'use strict';
const condenseKeys = require('condense-keys');
const getStream = require('get-stream');
const got = require('got');

module.exports = (buf, opts) => {
	const opt = Object.assign({token: 'Client-ID 34b90e75ab1c04b'}, opts);
	const token = opt.token;

	delete opt.token;

	return got.post('https://api.imgur.com/3/image', {
		json: true,
		headers: {
			authorization: token,
			'content-type': 'application/json'
		},
		body: Object.assign({image: buf.toString('base64')}, opt)
	}).then(res => {
		res = condenseKeys(res.body.data);
		res.date = new Date(res.datetime * 1000);
		delete res.datetime;
		return res;
	});
};

module.exports.stream = opts => {
	opts = opts || {};

	const stream = got.stream.post('https://api.imgur.com/3/image', {
		headers: {authorization: opts.token || 'Client-ID 34b90e75ab1c04b'}
	});

	getStream.array(stream).then(res => {
		res = condenseKeys(JSON.parse(res).data);
		res.date = new Date(res.datetime * 1000);
		delete res.datetime;
		stream.emit('upload', res);
	});

	return stream;
};
