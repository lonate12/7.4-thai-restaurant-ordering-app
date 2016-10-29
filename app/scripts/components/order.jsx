var React = require('react');

var MenuItem = require('../models/menu-items.js').MenuItem;
var MenuItemCollection = require('../models/menu-items.js').MenuItemCollection;
var Order = require('../models/order-items.js').Order;
var OrderCollection = require('../models/order-items.js').OrderCollection;

var MenuList = React.createClass({
  render: function(){
    return(
      <div className="col-md-9 menu-container">
        <MenuCategory></MenuCategory>
      </div>
    );
  }
});

var MenuCategory = React.createClass({
  render: function(){
    return(
      <ul className="category">
        A category
        <MenuItem></MenuItem>
      </ul>
    );
  }
});

var MenuItem = React.createClass({
  render: function(){
    return(
      <li className="menu-item">
        Coke
      </li>
    );
  }
});

var OrderList = React.createClass({
  render: function(){
    return(
      <div className="col-md-3">
        Order Div
      </div>
    )
  }
});

var OrderContainer = React.createClass({
  getInitialState: function(){
    var orderCollection = new OrderCollection();

    return {
      collection: orderCollection
    };
  },
  render: function(){
    return(
      <div className="row">
        <MenuList></MenuList>
        <OrderList></OrderList>
      </div>
    );
  }
});

module.exports = {
  OrderContainer: OrderContainer
};
