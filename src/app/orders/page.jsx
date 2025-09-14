"use client";
import Header from "@/Components/Header";
import { formatDate, formatPrice } from "@/utils/format";
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
    <div className="min-h-screen bg-green-50">
      <Header />

      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            You have no orders yet.
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    Total: {formatPrice(order.totalPrice)}
                  </span>
                </div>

                {/* Order Items */}
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li
                      key={item.product._id}
                      className="flex items-center justify-between py-3"
                    >
                      {/* Product Info */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={`http://localhost:5000${item.product.images[0]}`}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-md border"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <span className="font-medium text-gray-700">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </li>
                  ))}
                  <p>
                    <span className="font-semibold text-l">Order Date:</span>{" "}
                    {formatDate(order.createdAt)}
                  </p>
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
