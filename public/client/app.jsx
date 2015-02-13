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
          {this.props.content}
      </div>
    );
  }
});

var QuoteBox = React.createClass({
  loadQuotesFromServer: function() {
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
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadQuotesFromServer();
    // setInterval(this.loadQuotesFromServer, 5000);
  },
  render: function() {
    return (
      <Quote author={this.state.data.author} content={this.state.data.content}/>
    );
  }
});

React.renderComponent(
  <QuoteBox url="api/quotes/random" />,
  document.getElementById('quotes')
);