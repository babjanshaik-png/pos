const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    let total = 0;

    for (let item of req.body.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).send("Product not found");
      }

      if (product.stock < item.quantity) {
        return res.status(400).send("Not enough stock");
      }

      product.stock -= item.quantity;
      await product.save();

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      items: req.body.items,
      totalAmount: total
    });

    res.json(order);

  } catch (err) {
    res.status(500).send(err.message);
  }
};