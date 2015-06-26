'use strict';

var fileindex = require('../');
var expect = require('expect.js');
var broccoli = require('broccoli');
var fs = require('fs');
var path = require('path');

var builder;

describe('broccoli fileindex', function() {
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('should generate an HTML file', function() {
    var tree = fileindex('tests/fixtures', {
      files: ['**/*.html'],
      dest: 'index.html'
    });

    builder = new broccoli.Builder(tree);

    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(path.join(dir.directory, 'index.html'), {encoding: 'utf8'});
      var expected = fs.readFileSync('tests/mocks/index.html', {encoding: 'utf8'});
      expect(actual).to.equal(expected);
    });
  });
});
