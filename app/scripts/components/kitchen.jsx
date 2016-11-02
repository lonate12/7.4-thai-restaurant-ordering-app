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
