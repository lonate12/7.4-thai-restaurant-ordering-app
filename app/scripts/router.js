var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var ApplicationView = require('./components/order.jsx').ApplicationView;
var MenuItemCollection = require('./models/menu-items.js').MenuItemCollection;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(ApplicationView),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
