"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch("http://localhost:5000/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setOrders(data.orders || []);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded mb-4">
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{order.totalPrice}
            </p>
            <ul>
              {order.items.map((item) => (
                <li key={item.product._id}>
                  {item.product.name} × {item.quantity} (₹{item.price})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
