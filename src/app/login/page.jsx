"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "@/services/user.api";
import EmailField from "@/ui/EmailField";
import PasswordField from "@/ui/PasswordField";

export default function LoginPage() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(loginFormData);

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
          <EmailField value={loginFormData.email} onChange={handleChange} />
          <PasswordField
            value={loginFormData.password}
            onChange={handleChange}
          />

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
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
