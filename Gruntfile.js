module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  animateCSS = require('animate.css');

  var concatAnim;

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [ 'source/_base.css', 'source/**/*.css' ], // _base.css required for .animated helper class
        dest: 'animate.css'
      }
    },

    autoprefixer: { // https://github.com/nDmitry/grunt-autoprefixer
      options: {
        browsers: ['last 2 versions', 'bb 10']
      },
      no_dest: {
        src: 'animate.css' // output file
      }
    },

    cssmin: {
      minify: {
        src: ['animate.css'],
        dest: 'animate.min.css'
      }
    },

    watch: {
      css: {
        files: [ 'source/**/*', 'animate-config.json' ],
        tasks: ['default']
      }
    }

  });

  // function to perform custom task
  concatAnim = function () {
    var files = animateCSS.getFilesFromConfig();

    if (!files) {
      grunt.log.writeln('No animations activated.');
    } else {
      grunt.log.writeln(files.length + (files.length > 1 ? ' animations' : ' animation') + ' activated.');
    }
    files.push(animateCSS.getFileForBase());

    grunt.config('concat', { 'animate.css': files });
    grunt.task.run('concat');
  };

  // register task
  grunt.registerTask('concat-anim', 'Concatenates activated animations', concatAnim); // custom task
  grunt.registerTask('default', ['concat-anim', 'autoprefixer', 'cssmin']);
  grunt.registerTask('dev', ['watch']);

};
