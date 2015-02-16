'use strict';

var _ = require('underscore');
var quotes = require('./quotes');
var Helpers = require('./helpers');

var iconBank = {
  korra: 'http://vignette1.wikia.nocookie.net/avatar/images/c/ca/Korra.png/revision/latest?cb=20150127143653',
  zaheer: 'http://vignette1.wikia.nocookie.net/avatar/images/e/e1/Zaheer.png/revision/latest?cb=20140825190111',
  anon: 'http://vignette3.wikia.nocookie.net/avatar/images/0/00/Amon_and_his_Equalists.png/revision/latest?cb=20121107105523',
  asami: 'http://vignette1.wikia.nocookie.net/avatar/images/b/b6/Asami_Sato.png/revision/latest?cb=20141114200538'
};

function Quote(data) {
  this._id = quotes.length;
  this.author = Helpers.capitalizeAll(data.author);
  this.content = data.content;
  this.book = data.book;
  this.episode = Helpers.capitalizeAll(data.episode);

  this.attachIcon = function() {
    var that = this;
    that.icon = _.find(iconBank, function(v, k) {
      return k.toLowerCase() === that.author.toLowerCase();
    });
  };
};

module.exports = Quote;