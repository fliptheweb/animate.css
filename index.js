var animateConfig = require('./animate-config.json');
var fs = require('fs');
var path = require('path');
var baseStylesPath = path.resolve(__dirname, 'source/_base.css');

module.exports = {
  getFileForBase: function() {
    return baseStylesPath;
  },

  getFilesForAnimations: function(animations) {
    var categories = animateConfig;
    var targetFiles = [];
    var includeAllCategory, file, files, category;

    for (category in categories) {
      includeAllCategory = false;
      files = categories[category];
      if (animations.indexOf(category) != -1) {
        includeAllCategory = true;
      }
      for (file in files) {
        if (animations.indexOf(file) != -1 || includeAllCategory) {
          targetFiles.push(path.resolve(__dirname, 'source/' + category + '/' + file + '.css'));
        }
      }
    }

    return targetFiles;
  },

  getAnimationsFromConfig: function() {
    var categories = animateConfig;
    var targetAnimations = [];
    var category, animation, animations;

    for (category in categories) {
      animations = categories[category];
      for (animation in animations) {
        if (animations[animation]) {
          targetAnimations.push(animation);
        }
      }
    }

    return targetAnimations;
  },

  getFilesFromConfig: function() {
    return this.getFilesForAnimations(this.getAnimationsFromConfig());
  },

  getStylesForAnimations: function(animations) {
    return this.getFilesForAnimations(animations).reduce(function(styles, filepath) {
      return styles += fs.readFileSync(filepath);
    }, '');
  },

  getStylesForFiles: function(filepaths) {
    return filepaths.reduce(function(styles, filepath) {
      styles += fs.readFileSync(filepath);
    }, '');
  },

  getStylesFromConfig: function() {
    return this.getFilesFromConfig().reduce(function(styles, filepath) {
      styles += fs.readFileSync(filepath);
    }, '');
  },

  getStylesForBase: function() {
    return fs.readFileSync(this.getFileForBase());
  }
}
