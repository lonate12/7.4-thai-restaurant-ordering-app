var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var OrderContainer = require('./components/order.jsx').OrderContainer;
var MenuItemCollection = require('./models/menu-items.js').MenuItemCollection;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(OrderContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
