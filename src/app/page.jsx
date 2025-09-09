"use client";
import Header from "@/Components/Header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Header />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          This is Home page of my product site
        </h1>
        <nav className="space-x-4">
          <Link
            href="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </div>
  );
}
