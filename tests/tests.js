'use strict';

var fileindex = require('../');
var expect = require('expect.js');
var broccoli = require('broccoli');
var fs = require('fs');
var path = require('path');
var funnel = require('broccoli-funnel');

var builder;

describe('broccoli fileindex', function() {
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('should generate an HTML file listing links to pages', function() {
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

  it('should generate an HTML file listing links to pages from a tree', function() {
    var tree = fileindex(funnel('tests/fixtures', {destDir: 'html'}), {
      files: ['**/*.html'],
      dest: 'index.html'
    });

    builder = new broccoli.Builder(tree);

    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(path.join(dir.directory, 'index.html'), {encoding: 'utf8'});
      var expected = fs.readFileSync('tests/mocks/index-from-a-tree.html', {encoding: 'utf8'});
      expect(actual).to.equal(expected);
    });
  });

  it('should generate an HTML file listing links to pages from a tree with only filenames listed', function() {
    var tree = fileindex(funnel('tests/fixtures', {destDir: 'html'}), {
      files: ['**/*.html'],
      dest: 'index.html',
      showOnlyFilenames: true
    });

    builder = new broccoli.Builder(tree);

    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(path.join(dir.directory, 'index.html'), {encoding: 'utf8'});
      var expected = fs.readFileSync('tests/mocks/index-show-only-filenames.html', {encoding: 'utf8'});
      expect(actual).to.equal(expected);
    });
  });
});
