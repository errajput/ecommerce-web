"use client";
import {
  clearCart,
  fetchCart,
  removeItem,
  updateQuantity,
} from "@/services/cart.api";
import { placeOrder } from "@/services/order.api";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //  Fetch cart on load
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await fetchCart();
      setCart(data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await updateQuantity(itemId, quantity);
      loadCart();
    } catch (err) {
      alert("Error updating quantity: " + err.message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!confirm("Are you sure you want to remove this item?")) return;
    try {
      await removeItem(itemId);
      loadCart();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear your cart?")) return;
    try {
      await clearCart();
      setCart({ items: [] });
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      alert("Order placed successfully!");
      setCart({ items: [] });
      router.push("/orders");
      // window.location.href = "/orders";
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
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:cursor-not-allowed cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded bg-white ">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
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
                  {formatPrice(item.product.price)} x {item.quantity} ={" "}
                  <span className="font-bold">
                    {formatPrice(
                      Number(item.product?.price || 0) *
                        Number(item.quantity || 0)
                    )}
                  </span>
                </p>
                <button
                  onClick={() => handleRemoveItem(item._id)}
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
          onClick={handleClearCart}
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
          onClick={handlePlaceOrder}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
