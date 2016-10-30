var React = require('react');

var MenuItem = require('../models/menu-items.js').MenuItem;
var MenuItemCollection = require('../models/menu-items.js').MenuItemCollection;
var Order = require('../models/order-items.js').Order;
var OrderCollection = require('../models/order-items.js').OrderCollection;

var MenuCategoryRow = React.createClass({
  render: function(){
    console.log(this.props);
    return(
      <tr><th colSpan="2">{this.props.category}</th></tr>
    );
  }
});

var MenuItemRow = React.createClass({
  render: function(){
    return(
      <tr>
        <td className="menu-item">{this.props.name}</td>
        <td className="item-price">{this.props.price}</td>
        <td className="glyphicon glyphicon-plus"></td>
      </tr>
    );
  }
});

var MenuDescriptionRow = React.createClass({
  render: function(){
    return(
      <tr><td className="menu-item-description" colSpan="2">{this.props.description}</td></tr>
    );
  }
});

var MenuTable = React.createClass({
  render: function(){
    var rows =[];
    var lastCategory = null;
    this.props.menuCollection.forEach(function(menuItem){
      if(menuItem.get('category') !== lastCategory){
        rows.push(<MenuCategoryRow category={menuItem.get('category')} key={menuItem.get('_id')} />);
      }
      rows.push(<MenuItemRow name={menuItem.get('name')} price={menuItem.get('price')} key={menuItem.get('_id')}/>);
      rows.push(<MenuDescriptionRow description={menuItem.get('description')} key={menuItem.get('description')}/>);
      lastCategory = menuItem.get('category');
    });
    console.log(rows);
    return(
      <div className="col-md-9 menu-container">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
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
  getDefaultProps: function(){
    var menuList = new MenuItemCollection();

    return {
      menuCollection: menuList
    };
  },
  getInitialState: function(){
    var orderCollection = new OrderCollection();

    return {
      orderCollection: orderCollection
    };
  },
  componentWillMount: function(){
    var self = this;

    this.props.menuCollection.fetch().then(function(){
      self.forceUpdate();
    });
  },
  render: function(){
    return(
      <div className="row">
        <MenuTable menuCollection={this.props.menuCollection}></MenuTable>
        <OrderList></OrderList>
      </div>
    );
  }
});

module.exports = {
  OrderContainer: OrderContainer
};
