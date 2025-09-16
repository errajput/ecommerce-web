"use client";

import ImageSlider from "@/Components/ImageSlider";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
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
      if (res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login?message=Please login to view your cart";
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch cart");

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
  // Place order
  const placeOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders/place", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Order placed successfully!");
      setCart({ items: [] });
      window.location.href = "/orders"; // redirect to orders page
    } catch (err) {
      alert("Error placing order: " + err.message);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!cart || cart.items.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-green-800">Your Cart</h1>
        <p className="text-green-400">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 ">
      <h2 className="text-center text-3xl font-bold text-green-700 p-6">
        Your Cart
      </h2>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <ul className="divide-y divide-gray-200">
          {cart.items.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between gap-6 p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              {/* Product Image */}

              <img
                src={`http://localhost:5000${item.product.images[0]}`}
                alt={item.product.name}
                className="w-24 h-24 object-contain rounded-md border"
              />

              {/* Product Info */}
              <div className="flex-1">
                <Link
                  href={`/products/${item?.product?._id}`}
                  className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-md transition"
                >
                  <p className="text-lg font-semibold">{item.product.name}</p>
                </Link>
                <p className="text-green-600 font-bold">
                  {formatPrice(item.product.price)}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {item.product.status}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:cursor-not-allowed cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded bg-white ">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= 5}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:cursor-not-allowed cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Remove */}
              <div className="text-right">
                <p className="font-medium text-gray-700">
                  {formatPrice(item.product.price)} × {item.quantity} ={" "}
                  <span className="font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </p>
                <button
                  onClick={() => removeItem(item._id)}
                  className="mt-2 text-red-500  cursor-pointer"
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
          Total:
          {formatPrice(
            cart.items.reduce((acc, item) => {
              const price = Number(item.product?.price);
              const quantity = Number(item.quantity);
              return acc + price * quantity;
            }, 0)
          )}
        </p>
        <button
          onClick={placeOrder}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
