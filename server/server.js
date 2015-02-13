var express = require('express'),
  bodyParser = require('body-parser');
  morgan = require('morgan');
  app = express();

var quotes = [
  {
    author: 'Zahir', 
    content: 'Accept what happend to you, don\'t fear what might have been.',
    book: '4',
    episode: 'Behind the Vines',
  },
  {
    author: 'Zahir', 
    content: 'You think your power has limits, I say, it\'s limitless.',
    book: '4',
    episode: 'Behind the Vines'
  },
  {
    author: 'Zahir', 
    content: 'I learned to fly but now I\'m bound by chains.  You have all the power in the world and the freedom to use it. But you choose to hold yourself down.',
    book: '4',
    episode: 'Behind the Vines'
  }
];

app.use(morgan('combined'));

console.log(__dirname);

app.use(express.static(__dirname + '../../public'));

app.get('/api/quotes', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(quotes));
});

app.get('/api/quotes/random', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var quote = quotes[Math.floor(Math.random()*(quotes.length))];
  res.send(JSON.stringify(quote));
})

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server started, listening on port', port);