const Order = require('../models/Order');

exports.getAnalytics = async () => {
  const orders = await Order.find();

  return {
    totalOrders: orders.length,
    totalSales: orders.reduce((sum, o) => sum + o.totalAmount, 0)
  };
};