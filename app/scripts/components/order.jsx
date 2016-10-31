var React = require('react');

var MenuItem = require('../models/menu-items.js').MenuItem;
var MenuItemCollection = require('../models/menu-items.js').MenuItemCollection;
var OrderItem = require('../models/order-items.js').OrderItem;
var OrderItemCollection = require('../models/order-items.js').OrderItemCollection;

var MenuCategoryRow = React.createClass({
  render: function(){
    return(
      <tr><th colSpan="2">{this.props.category}</th></tr>
    );
  }
});

var MenuItemRow = React.createClass({
  handleClick: function(){
    this.props.addItemToOrder(this.props.model);
  },
  render: function(){
    return(
      <tr>
        <td className="menu-item">{this.props.name}</td>
        <td className="item-price">{this.props.price}</td>
        <td className="glyphicon glyphicon-plus" onClick={this.handleClick}></td>
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
    var self = this;
    var rows =[];
    var lastCategory = null;
    this.props.menuCollection.forEach(function(menuItem){
      if(menuItem.get('category') !== lastCategory){
        rows.push(<MenuCategoryRow category={menuItem.get('category')} key={menuItem.get('_id')} />);
      }
      rows.push(<MenuItemRow model={menuItem} addItemToOrder={self.props.addItemToOrder} name={menuItem.get('name')} price={menuItem.get('price')} key={menuItem.get('name')}/>);
      rows.push(<MenuDescriptionRow description={menuItem.get('description')} key={menuItem.get('description')}/>);
      lastCategory = menuItem.get('category');
    });

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

var OrderListItem = React.createClass({
  handleRemove: function(){
    this.props.handleRemove(this.props.orderItem);
  },
  render: function(){
    return(
      <li className="order-list-item">{this.props.orderItem.get('name')} <span>{this.props.orderItem.get('price')}</span> <span className="remove" onClick={this.handleRemove}>Remove</span></li>
    );
  }
});

var OrderDiv = React.createClass({
  handleSubmit: function(e){
    this.props.handleSubmit(e);
  },
  render: function(){
    var self = this;
    var currentOrderList = this.props.orderItemCollection.map(function(orderItem){
      return(
        <OrderListItem
          key={orderItem.cid}
          orderItem={orderItem}
          handleRemove={self.props.handleRemove}
        />
      )
    });
    return(
      <div className="col-md-3">
        <p className="my-order">My Order</p>
        <div className="order-div">
          <ul className="order-list">
            {currentOrderList}
          </ul>
          <p className="total">Total: ${this.props.orderItemCollection.total().toFixed(2)}</p>
          <button className="submit-order" onClick={this.handleSubmit}>Submit Order</button>
        </div>
      </div>
    )
  }
});

var ApplicationView = React.createClass({
  getDefaultProps: function(){
    var menuList = new MenuItemCollection();

    return {
      menuCollection: menuList,
    };
  },
  getInitialState: function(){
    var orderItemCollection = new OrderItemCollection();

    return {
      orderItemCollection: orderItemCollection
    }
  },
  addItemToOrder: function(menuItem){
    var orderProps = {
      name: menuItem.get('name'),
      price: menuItem.get('price')
    };
    var orderItem = new OrderItem(orderProps);

    this.state.orderItemCollection.add(orderItem);
    this.setState({orderItemCollection: this.state.orderItemCollection});
  },
  handleRemove: function(orderItem){
    console.log(this.state.orderItemCollection);
    this.state.orderItemCollection.remove(orderItem);
    this.setState({orderItemCollection: this.state.orderItemCollection});
  },
  handleSubmit: function(e){
    e.preventDefault();
    console.log('Trying to submit order');
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
        <MenuTable menuCollection={this.props.menuCollection} addItemToOrder={this.addItemToOrder}></MenuTable>
        <OrderDiv handleSubmit={this.handleSubmit} orderItemCollection={this.state.orderItemCollection} handleRemove={this.handleRemove}></OrderDiv>
      </div>
    );
  }
});

module.exports = {
  ApplicationView: ApplicationView
};
