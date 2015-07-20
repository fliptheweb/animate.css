var animateConfig = require('./animate-config.json');
var fs = require('fs');
var baseStylesPath = 'source/_base.css';

module.exports = {
  getFilesForAnimations: function(animations) {
    var categories = animateConfig;
    var targetFiles = [];

    for (category in categories) {
      files = categories[category];
      for (file in files) {
        if (files[file]) {
          if (animations.indexOf(file) != -1) {
            targetFiles.push('source/' + category + '/' + file + '.css');
          }
        }
      }
    }

    return targetFiles;
  },

  getAnimationsFromConfig: function() {
    var categories = animateConfig;
    var targetAnimations = [];

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
  }
}
