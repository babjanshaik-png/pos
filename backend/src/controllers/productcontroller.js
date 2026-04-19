const Product = require('../models/Product');
let redis = null;

try {
  const r = require('../config/redis');
  if (r && r.status === 'ready') {
    redis = r;
  }
} catch (err) {
  console.log("Redis disabled");
}
exports.getProducts = async (req, res) => {
  if (redis) {
    try {
      const cached = await redis.get("products");
      if (cached) return res.json(JSON.parse(cached));
    } catch {}
  }

  const products = await Product.find();

  if (redis) {
    try {
      await redis.set("products", JSON.stringify(products), "EX", 60);
    } catch {}
  }

  res.json(products);
};

exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);

  if (redis) {
    try {
      await redis.del("products");
    } catch {}
  }

  res.json(product);
};
exports.getByBarcode = async (req, res) => {
  const product = await Product.findOne({ barcode: req.params.code });
  res.json(product);
};