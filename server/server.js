var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  app = express(),
  _ = require('underscore');

var quotes = [
  {
    _id: 0,
    author: 'Zahir', 
    content: 'Accept what happend to you, don\'t fear what might have been.',
    book: '4',
    episode: 'Behind the Vines',
  },
  {
    _id: 1,
    author: 'Zahir', 
    content: 'You think your power has limits, I say, it\'s limitless.',
    book: '4',
    episode: 'Behind the Vines'
  },
  {
    _id: 2,
    author: 'Zahir', 
    content: 'I learned to fly but now I\'m bound by chains.  You have all the power in the world and the freedom to use it. But you choose to hold yourself down.',
    book: '4',
    episode: 'Behind the Vines'
  },
  {
    _id: 3,
    author: 'Korra',
    content: 'I\'m the Avatar! You gotta deal with it!',
    book: '1',
    episode: 'Welcome to Republic City'
  }
];

app.use(morgan('combined'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

console.log(__dirname);

app.use(express.static(__dirname + '../../public'));

app.get('/api/quotes', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(quotes));
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
  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(quote));
});

app.post('/api/quotes', function(req, res) {
  var quote = req.body.data;
  quote._id = quotes.length;
  quotes.push(quote);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(quote));
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server started, listening on port', port);