var animateConfig = require('./animate-config.json');
var fs = require('fs');
var baseStylesPath = 'source/_base.css';

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
      if (animations.indexOf(category)) {
        includeAllCategory = true;
      }
      for (file in files) {
        if (animations.indexOf(file) != -1 || includeAllCategory) {
          targetFiles.push('source/' + category + '/' + file + '.css');
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
    var files = this.getFilesForAnimations(animations);
    var styles;

    files.forEach(function(file) {
      styles += fs.readFileSync(file);
    });

    return styles;
  },

  getStylesForFiles: function(files) {
    var styles;

    files.forEach(function(file) {
      styles += fs.readFileSync(file);
    });

    return styles;
  },

  getStylesFromConfig: function() {
    var files = this.getFilesFromConfig();
    var styles;

    files.forEach(function(file) {
      styles += fs.readFileSync(file);
    });

    return styles;
  },

  getStylesForBase: function() {
    return fs.readFileSync(this.getFileForBase());
  }
}
