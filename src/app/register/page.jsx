"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { registerUser } from "@/services/user.service";
import EmailField from "@/ui/EmailField";
import TextField from "@/ui/TextField";
import PasswordField from "@/ui/PasswordField";

export default function RegisterPage() {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(registerFormData);

      setMessage("Registration successful");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setMessage(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          Create Account ✨
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label={"Full Name"}
            value={registerFormData.name}
            onChange={handleChange}
          />
          <EmailField value={registerFormData.email} onChange={handleChange} />
          <PasswordField
            value={registerFormData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Register
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
