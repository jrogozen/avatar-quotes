var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  _ = require('underscore');

var Quote = require('./quote.model');
var quotes = require('./quotes');

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

console.log(__dirname);

app.use(express.static(__dirname + '../../public'));

app.get('/api/quotes', function(req, res) {
  res.status(200).send(JSON.stringify(quotes));
});

app.get('/api/quotes/random', function(req, res) {
  var lastQuote = req.query.quote;
  var quote;
  
  if(lastQuote) {
    var availableQuotes = _.filter(quotes, function(quote) {
      return quote._id !== parseInt(lastQuote._id);
    });
    quote = availableQuotes[Math.floor(Math.random()*(availableQuotes.length))];
  } else {
    quote = quotes[Math.floor(Math.random()*(quotes.length))];
  }

  res.status(200).send(JSON.stringify(quote));
});

app.post('/api/quotes', function(req, res) {
  var quote = new Quote(req.body.data);
  quote.attachIcon();
  quotes.push(quote);
  res.status(200).send(JSON.stringify(quote));
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server started, listening on port', port);