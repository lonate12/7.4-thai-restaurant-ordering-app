var React = require('react');
var OrderCollection = require('../models/order-items.js').OrderCollection;

var KitchenContainer = React.createClass({
  getInitialState: function(){
    var orderCollection = new OrderCollection();
    var self = this;

    orderCollection.fetch().then(function(){
      self.setState({orderCollection: self.state.orderCollection});
    });

    return {
      orderCollection: orderCollection
    }
  },
  render: function(){
    var orderCollection = this.state.orderCollection;
    var orders = orderCollection.map(function(order){
      var orderItems = order.get('items');
      var itemsList = orderItems.map(function(item, index){
        return(
          <li className="kitchen-items-li" key={index}>{item.name}</li>
        )
      });
      return(
        <div key={order.get('_id')} className="col-md-3">
          <div className="col-md-12 kitchen-order-view">
            <p>{order.get('time_placed')}</p>
            <p>{order.get('order_name')}</p>
            <ul className="kitchen-items-ul">
              {itemsList}
            </ul>
          </div>
        </div>
      );
    }
    );

    return(
      <div className="container">
        <div className="row">
          {orders}
        </div>
      </div>
    );
  }
});

module.exports = {
  KitchenContainer: KitchenContainer
};
