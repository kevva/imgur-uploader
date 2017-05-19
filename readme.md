# imgur-uploader [![Build Status](https://travis-ci.org/kevva/imgur-uploader.svg?branch=master)](https://travis-ci.org/kevva/imgur-uploader)

> Upload images to [imgur](http://imgur.com)


## Install

```
$ npm install --save imgur-uploader
```


## Usage

```js
const fs = require('fs');
const imgurUploader = require('imgur-uploader');

imgurUploader(fs.readFileSync('cat.jpg'), {title: 'Hello!'}).then(data => {
	console.log(data);
	/*
	{
		id: 'OB74hEa',
		link: 'http://i.imgur.com/jbhDywa.jpg',
		title: 'Hello!',
		date: Sun May 24 2015 00:02:41 GMT+0200 (CEST),
		type: 'image/jpg',
		...
	}
	*/
});
```


## API

### imgurUploader(input, [options])

#### input

Type: `Buffer`

Image to upload.

#### options

See the [imgur options](https://api.imgur.com/endpoints/image) in addition to the ones below.

#### token

Type: `string`<br>
Default: `Client-ID 34b90e75ab1c04b`

Override the default authorization token (you probably want to).


## Related

* [imgur-uploader-cli](https://github.com/kevva/imgur-uploader-cli) - CLI for this module


## License

MIT © [Kevin Martensson](http://github.com/kevva)
