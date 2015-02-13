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
  render: function() {
    return (
      <button onClick={this.handleClick}>Next</button>
    );
  }
});

var QuoteBox = React.createClass({
  loadQuoteFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
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
        <QuoteForm onClick={this.handleClick}/>
      </div>
    );
  }
});

React.renderComponent(
  <QuoteBox url="api/quotes/random" />,
  document.getElementById('quotes')
);