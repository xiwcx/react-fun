var React = require('react');

var view = require('./views/view.jsx'); // need to specify the jsx extension
React.renderComponent(view(), document.getElementById('content'));
