var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var ApplicationView = require('./components/order.jsx').ApplicationView;
var KitchenContainer = require('./components/kitchen.jsx').KitchenContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'kitchen/': 'kitchenView'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(ApplicationView),
      document.getElementById('app')
    );
  },
  kitchenView: function(){
    ReactDOM.render(
      React.createElement(KitchenContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
