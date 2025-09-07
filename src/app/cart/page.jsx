"use client";

import ImageSlider from "@/Components/ImageSlider";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Fetch cart on load
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  //  Update quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await fetch(`http://localhost:5000/cart/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ quantity }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      //setCart(result.cart);
      fetchCart();
    } catch (err) {
      alert("Error updating quantity:r", err.message);
    }
  };
  //  Remove item
  const removeItem = async (itemId) => {
    try {
      const res = await fetch(`http://localhost:5000/cart/items/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      // setCart(result.cart);
      fetchCart();
    } catch (err) {
      alert(err.message);
    }
  };

  //  Clear cart
  const clearCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart/items", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      setCart({ items: [] });
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!cart || cart.items.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );

  return (
    <div>
      <h2 className="flex items-center justify-around py-4 text-3xl font-bold mb-6">
        Your Cart
      </h2>
      <div className="max-w-3xl mx-auto p-6 mt-6 bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {cart.items.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-around py-4"
            >
              <div className="max-w-2 flex justify-center items-start">
                <ImageSlider
                  images={
                    item.product.images?.length
                      ? item.product.images.map(
                          (i) => `http://localhost:5000${i}`
                        )
                      : []
                  }
                />
              </div>
              <div>
                <p className="text-2xl font-bold mb-4">{item.product.name}</p>

                <p className="text-xl text-green-600 font-bold mb-4">
                  <strong>Price:</strong> ₹{item.product.price}
                </p>
                <p className="mb-2">
                  <strong>Status:</strong> {item.product.status}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-gray-600">
                  {item.product.price} × {item.quantity} ={" "}
                  {item.product.price * item.quantity}
                </p>

                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-4 text-gray-400 hover:bg-gray-200 p-1 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-around items-center mt-6">
        <button
          onClick={clearCart}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Clear Cart
        </button>
        <p className="text-xl font-bold">
          Total: ₹
          {cart.items.reduce((acc, item) => {
            const price = Number(item.product?.price);
            const quantity = Number(item.quantity);
            return acc + price * quantity;
          }, 0)}
        </p>
      </div>
    </div>
  );
}
