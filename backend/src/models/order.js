const mongoose = require('mongoose');

module.exports = mongoose.model('Order', new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
}));