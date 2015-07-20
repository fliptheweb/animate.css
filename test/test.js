var animateCSS = require('animate.css');
var assert = require('assert');

describe('Animate.css', function() {
  describe('#getFileForBase()', function() {
    it('should return "source/_base.css"', function() {
      assert.equal(animateCSS.getFileForBase(), 'source/_base.css');
    });
  });

  describe('#getFilesForAnimations()', function() {
    it('should return empty array, when animations is not present', function() {
      assert.equal(animateCSS.getFilesForAnimations([]), []);
    });

    it('should return array with "" path when pass ["fadeIn"]', function() {
      assert.equal(animateCSS.getFilesForAnimations(['fadeIn']), []);
    });

    it('should return array with all animations when pass name of category', function() {
      assert.equal(animateCSS.getFilesForAnimations(['sliding_exits']), [])
    });
  });
});
