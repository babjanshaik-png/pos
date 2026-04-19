import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Load products from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Checkout
  const checkout = async () => {
    const items = cart.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    try {
      const res = await axios.post(
        'http://localhost:5000/api/orders',
        { items }
      );

      alert("✅ Order placed!");

      // Open invoice PDF
      window.open(
        `http://localhost:5000/api/orders/invoice/${res.data._id}`,
        "_blank"
      );

      setCart([]);

      // Refresh products (stock update)
      const updated = await axios.get('http://localhost:5000/api/products');
      setProducts(updated.data);

    } catch (err) {
      alert("❌ Error placing order");
    }
  };

  return (
    <div style={{ display: 'flex', padding: 20 }}>
      
      {/* PRODUCTS */}
      <div style={{ flex: 1 }}>
        <h2>🛍 Products</h2>
        {products.map(p => (
          <div key={p._id} style={{ marginBottom: 10 }}>
            <b>{p.name}</b> - ₹{p.price}  
            <br />
            Stock: {p.stock}
            <br />
            <button onClick={() => addToCart(p)}>Add</button>
          </div>
        ))}
      </div>

      {/* CART */}
      <div style={{ flex: 1 }}>
        <h2>🧾 Cart</h2>
        {cart.length === 0 && <p>No items</p>}

        {cart.map(item => (
          <div key={item._id}>
            {item.name} x {item.quantity}
          </div>
        ))}

        <button onClick={checkout} disabled={cart.length === 0}>
          Checkout
        </button>
      </div>

    </div>
  );
}