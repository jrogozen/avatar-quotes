/**
 * @jsx React.DOM
 */
 
var Quote = React.createClass({
  render: function() {
    return (
      <div className="quote">
        <h2 className="quoteAuthor">
          {this.props.author}
        </h2>
        <p>{this.props.content}</p>
        <p>Book {this.props.book}, "{this.props.episode}"</p>
      </div>
    );
  }
});

var QuoteForm = React.createClass({
  handleClick: function() {
    this.props.onClick(this);
  },
  getInitialState: function() {
    return { showQuoteAdd: false, showSuccess: false, showError: false };
  },
  showQuoteAdd: function() {
    this.setState({ showQuoteAdd: true });
  },
  handleQuoteSubmit: function(quote) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {
        data: quote
      },
      success: function(data) {
        var that = this;
        that.setState({ showQuoteAdd: false, showSuccess: true });
        window.setTimeout(function() {
          that.setState({ showSuccess: false });
        }, 2000);
      }.bind(this),
      error: function(err) {
        var that = this;
        that.setState({ showQuoteAdd: false, showError: true });
        window.setTimeout(function() {
          that.setState( { showError: false });
        }, 2000);
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div>
      {this.state.showSuccess ? <div className="alert success">Quote added!</div> : null}
      {this.state.showError ? <div className="alert error">Quote failed to add</div> : null}
      <button onClick={this.handleClick}>Next</button>
      <button onClick={this.showQuoteAdd}>Add Quote</button>
      {this.state.showQuoteAdd ? <QuoteAdd handleQuoteSubmit={this.handleQuoteSubmit} /> : null }
      </div>
    );
  }
});

var QuoteAdd = React.createClass({
  getValue: function(node) {
    return this.refs[node].getDOMNode().value.trim();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.getValue('author');
    var content = this.getValue('content');
    var book = this.getValue('book');
    var episode = this.getValue('episode');
    this.props.handleQuoteSubmit({author: author, content: content, book: book, episode: episode})
    return false;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add Quote</h1>
        <input type="text" placeholder="Author name" ref="author" />
        <input type="text" placeholder="Quote" ref="content" />
        <input type="text" placeholder="Book number" ref="book" />
        <input type="text" placeholder="Episode name" ref="episode" />
        <input type="submit" value="Save"/>
      </form>
    )
  }
})

var QuoteBox = React.createClass({
  loadQuoteFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: {
        'quote': this.state.data
      },
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleClick: function(child) {
    this.loadQuoteFromServer();
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadQuoteFromServer();
  },
  render: function() {
    return (
      <div>
        <Quote author={this.state.data.author} content={this.state.data.content} book={this.state.data.book} episode={this.state.data.episode}/>
        <QuoteForm onClick={this.handleClick} url="api/quotes"/>
      </div>
    );
  }
});

React.renderComponent(
  <QuoteBox url="api/quotes/random" />,
  document.getElementById('quotes')
);