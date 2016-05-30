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

imgurUploader(fs.readFileSync('cat.jpg')).then(data => {
	console.log(data);
	/*
	{
		id: 'OB74hEa',
		link: 'http://i.imgur.com/jbhDywa.jpg',
		date: Sun May 24 2015 00:02:41 GMT+0200 (CEST),
		type: 'image/jpg',
		...
	}
	*/
});
```

You can also use the streaming interface like below:

```js
const fs = require('fs');
const stream = require('imgur-uploader');

stream.on('upload', data => {
	console.log(data);
	/*
	{
		id: 'OB74hEa',
		link: 'http://i.imgur.com/jbhDywa.jpg',
		date: Sun May 24 2015 00:02:41 GMT+0200 (CEST),
		type: 'image/jpg',
		...
	}
	*/
});

fs.createReadStream('cat.jpg').pipe(imgurUploader.stream());
```


## Related

* [imgur-uploader-cli](https://github.com/kevva/imgur-uploader-cli) - CLI for this module


## License

MIT © [Kevin Martensson](http://github.com/kevva)
