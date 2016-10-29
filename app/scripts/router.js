var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var OrderContainer = require('./components/order.jsx').OrderContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    console.log('index fired');
    ReactDOM.render(
      React.createElement(OrderContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
