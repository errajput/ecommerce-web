"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-400 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Product App</h1>
      <nav className="space-x-9">
        <Link href="/products" className="cursor-pointer">
          Products
        </Link>
        <Link href="/products/add" className="cursor-pointer">
          Add Product
        </Link>
        <Link
          href="/products"
          className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer"
        >
          Back
        </Link>
      </nav>
    </header>
  );
}
