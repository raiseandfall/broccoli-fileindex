'use strict';

var fs = require('fs');
var path = require('path');
var Writer = require('broccoli-writer');
var globby = require('globby');
var RSVP = require('rsvp');

var FileIndex = function FileIndex(inputTree, options) {
  if (!(this instanceof FileIndex)) {
    return new FileIndex(inputTree, options);
  }

  options = options || {};

  this.inputTree = inputTree;
  this.files = options.files || [];
  this.dest = options.dest || 'index.html';
};

FileIndex.prototype = Object.create(Writer.prototype);
FileIndex.prototype.Constructor = FileIndex;
FileIndex.prototype.write = function(readTree, destDir) {
  var self = this;

  return readTree(this.inputTree).then(function(srcDir) {
    return new RSVP.Promise(function(resolve, reject) {

      var fil = self.files.map(function(n) {
        return path.join(srcDir, n);
      });

      try {
        globby(fil, {}, function(err, files) {
          for (var i = 0; i < files.length; i++) {
            var filename = files[i].split(srcDir).pop();
            filename = filename.charAt(0) === '/' ? filename.slice(1, filename.length) : filename;
            files[i] = '<a href="' + files[i] + '" style="display: block; margin-bottom: 15px; padding-left: 15px;">'+ filename +'</a>\n';
          }
          var output = files.join("");

          fs.writeFile(path.join(destDir, self.dest), output, function() {
            resolve();
          });
        });
      } catch(e) {
        reject(e);
      }
    });
  });
};

module.exports = FileIndex;
