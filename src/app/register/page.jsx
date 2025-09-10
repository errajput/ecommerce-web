"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/Components/Header";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Register data", data);

      if (res.ok) {
        setMessage("Registration successful 🎉");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.message || "Registration failed ❌");
      }
    } catch (err) {
      setMessage("Something went wrong 🚨");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
            Create Account ✨
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>

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
              Register
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
