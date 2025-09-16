"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/user.api";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const redirectMsg = localStorage.getItem("redirectMessage");
    if (redirectMsg) {
      setMessage(redirectMsg);
      localStorage.removeItem("redirectMessage");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      if (data?.data?.token) {
        setMessage("Login successful ");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/profile");
      } else {
        setMessage(data.message || "Invalid credentials ");
      }
    } catch (err) {
      setMessage("Something went wrong ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
