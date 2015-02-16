'use strict'

var helpers = {
  capitalize: function(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  capitalizeAll: function(sentence) {
    var words = sentence.split(' ');
    if (words.length < 2) {
      return this.capitalize(words[0]);
    }
    var capitalizedWords = words.map(function(word) {
      return this.capitalize(word);
    })
    return capitalizedWords.join(' ');
  }
};

module.exports = helpers;