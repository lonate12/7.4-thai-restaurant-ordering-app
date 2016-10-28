var Backbone = require('backbone');

var OrderItem = Backbone.Model.extend({
  idAttribute: '_id'
});

var OrderItemCollection = Backbone.Collection.extend({
  model: OrderItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/rene-thai-orders'
});

module.exports = {
  OrderItem: OrderItem,
  OrderItemCollection: OrderItemCollection
};
