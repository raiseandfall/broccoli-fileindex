# Broccoli-fileindex  

[![Build Status](https://travis-ci.org/raiseandfall/broccoli-fileindex.svg)](https://travis-ci.org/raiseandfall/broccoli-fileindex) [![Downloads](https://img.shields.io/npm/dt/broccoli-fileindex.svg)](https://www.npmjs.com/package/broccoli-fileindex)

> Outputs a HTML file that list links to other HTML pages

> There is also a version for [Gulp](https://github.com/raiseandfall/gulp-fileindex)

## [CHANGELOG](./CHANGELOG.md)

## INSTALL

```shell
$ npm install broccoli-fileindex
```

## USAGE
```javascript
var fileindex = require('broccoli-fileindex');

var tree = fileindex(html, {
  files: ['**/*.html'],
  dest: 'index.html'
});
```

## OPTIONS

### fileindex(tree, options)

#### options.files
Type: `Array`  
_Required_  

This option is the glob of the pages you want to generate the links.

#### options.dest
Type: `String`  
_Optional_  
**Default** index.html  

Path to the HTML page to generate.

#### options.showOnlyFilenames
Type: `Boolean`  
_Optional_  
**Default** false

Whether ot not to show only the filenames in the HTML listing page

## CONTRIBUTE
```shell
$ npm run test
```

## LICENSE
MIT
