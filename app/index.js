var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App');
var PropTypes = require('prop-types');

ReactDOM.render (
  <App />,
  document.getElementById('app')
)
