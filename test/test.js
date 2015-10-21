import fs from 'fs';
import path from 'path';
import rfpify from 'rfpify';
import test from 'ava';
import fn from '../';

const buf = fs.readFileSync(path.join(__dirname, 'fixtures/test.png'));

test(async t => {
	const data = await fn(buf);

	t.ok(data);
	t.is(data.type, 'image/png');
	t.notOk(data.title);
});

test(async t => {
	const stream = fn.stream();
	stream.end(buf);
	const data = await rfpify(stream.once.bind(stream))('upload');

	t.ok(data);
	t.is(data.type, 'image/png');
	t.notOk(data.title);
});
