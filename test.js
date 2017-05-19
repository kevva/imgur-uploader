import fs from 'fs';
import path from 'path';
import pify from 'pify';
import rfpify from 'rfpify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('buffer', async t => {
	const {title, type} = await m(await fsP.readFile(path.join(__dirname, 'fixture.png')));

	t.is(type, 'image/png');
	t.falsy(title);
});

test('stream', async t => {
	const stream = m.stream();
	stream.end(await fsP.readFile(path.join(__dirname, 'fixture.png')));
	const {title, type} = await rfpify(stream.once.bind(stream))('upload');

	t.is(type, 'image/png');
	t.falsy(title);
});

test('options', async t => {
	const {title, type} = await m(await fsP.readFile(path.join(__dirname, 'fixture.png')), {title: 'foo'});

	t.is(type, 'image/png');
	t.is(title, 'foo');
});
