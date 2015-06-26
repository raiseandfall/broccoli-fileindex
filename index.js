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
  this.showOnlyFilenames = options.showOnlyFilenames || false;
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
            var stripTmp = files[i].split(destDir).pop();
            var stripFolder = stripRootSlash(stripTmp.split(srcDir).pop());
            var filename = self.showOnlyFilenames ? stripFolder.split('/').pop() : stripFolder;
            files[i] = '<a href="' + stripRootSlash(stripFolder) + '" style="display: block; margin-bottom: 15px; padding-left: 15px;">'+ filename +'</a>\n';
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

var stripRootSlash = function(f) {
  return f.charAt(0) === '/' ? f.slice(1, f.length) : f;
};

module.exports = FileIndex;
