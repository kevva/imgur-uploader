import fs from 'fs';
import path from 'path';
import pify from 'pify';
import rfpify from 'rfpify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('buffer', async t => {
	const data = await m(await fsP.readFile(path.join(__dirname, 'fixture.png')));

	t.is(data.type, 'image/png');
	t.falsy(data.title);
});

test('stream', async t => {
	const stream = m.stream();
	stream.end(await fsP.readFile(path.join(__dirname, 'fixture.png')));
	const data = await rfpify(stream.once.bind(stream))('upload');

	t.is(data.type, 'image/png');
	t.falsy(data.title);
});

test('options', async t => {
	const data = await m(await fsP.readFile(path.join(__dirname, 'fixture.png')), {title: 'foo'});

	t.is(data.type, 'image/png');
	t.is(data.title, 'foo');
});
