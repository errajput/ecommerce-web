"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { getUserProfile } from "@/services/user.api";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //useEffect itself can’t be async, Immediately Invoked Function Expression
    (async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err) {
        console.error("Error fetching user:", err.message);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <p className="text-lg font-semibold text-gray-700">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <p className="text-lg font-semibold text-red-600">No user found</p>
      </div>
    );
  }

  return (
    <div className="h-100 flex items-center justify-center m-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6">
          Profile 👤
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          {user.isSeller && (
            <Link
              href="/products/add"
              className="block w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Add Product
            </Link>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/cart"
            className="block w-full bg-green-500 text-white font-semibold p-3 rounded-lg hover:bg-green-600 transition"
          >
            🛒 My Cart
          </Link>
          <Link
            href="/orders"
            className="block w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
          >
            📦 My Orders
          </Link>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="mt-6 w-full bg-gray-400 text-white font-semibold p-3 rounded-lg hover:bg-gray-500 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
