"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Product App</h1>
      <nav className="space-x-9">
        <Link href="/products" className="cursor-pointer">
          Products
        </Link>
        <Link href="/products/add" className="cursor-pointer">
          Add Product
        </Link>
        <Link href="/register" className="cursor-pointer">
          Register
        </Link>
        <Link href="/login" className=" cursor-pointer">
          Login
        </Link>
      </nav>
    </header>
  );
}
