/**
 * @jsx React.DOM
 */

var Nav = React.createClass({
  render: function() {
    return (
      <ul>
        <li>Home</li>
        <li>Quote Generator</li>
      </ul>
    );
  }
});

React.renderComponent(
  <Nav />,
  document.getElementById('nav')
);