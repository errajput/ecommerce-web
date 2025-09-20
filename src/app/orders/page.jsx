"use client";

import { BASE_URL, getToken } from "@/services/http.service";
import { getOrders, updateOrderStatus } from "@/services/order.api";
import { getUserProfile } from "@/services/user.service";
import SelectField from "@/ui/SelectField";
import { formatDate, formatPrice } from "@/utils/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderContainer = ({ order, isSeller }) => {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.status);

  const updateStatus = async () => {
    const res = await updateOrderStatus(order._id, orderStatus);
    console.log("order update result", res);
    order.status = orderStatus;
    setIsEditingStatus(false);
  };

  return (
    <div
      key={order._id}
      className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
    >
      {/* Order Header */}
      <div className="flex justify-between items-center mb-3">
        {isEditingStatus ? (
          <div className="flex items-center gap-2">
            <SelectField
              value={orderStatus}
              options={[
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
              ].map((v) => ({ label: v, value: v }))}
              onChange={(e) => setOrderStatus(e.target.value)}
            />
            <button
              className="px-3 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
              onClick={updateStatus}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {order.status}
            </span>
            <button
              onClick={() => setIsEditingStatus(true)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
        )}
        <span className="text-lg font-semibold text-gray-800">
          Total: {formatPrice(order.totalPrice)}
        </span>
      </div>

      {/* Order Items */}
      <ul className="divide-y divide-gray-200">
        {order.items.map((item) => (
          <li
            key={item?._id}
            className="flex items-center justify-between py-3"
          >
            {/* Product Info */}
            <Link
              href={`/products/${item?.product?._id}`}
              className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-md transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`${BASE_URL}${item?.product?.images[0]}`}
                  alt={item.product?.name}
                  className="w-14 h-14 object-cover rounded-md border"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {item.product?.name}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            </Link>
            {/* Price */}
            <span className="font-medium text-gray-700">
              {formatPrice(item.price)}
            </span>
          </li>
        ))}
        <p>
          <span className="font-semibold text-l">Order Date:</span>{" "}
          {formatDate(order.createdAt)}
          {isSeller && <> | Order By: {order?.user?.name}</>}
        </p>
      </ul>
    </div>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const token = getToken;
    if (!token) {
      router.push("/login");
      return;
    }

    getUserProfile().then((user) => {
      if (user.isSeller) {
        setIsSeller(true);
      }
    });

    async function fetchOrders() {
      try {
        const data = await getOrders(token);
        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  return (
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
            <OrderContainer key={order._id} order={order} isSeller={isSeller} />
          ))}
        </div>
      )}
    </div>
  );
}
