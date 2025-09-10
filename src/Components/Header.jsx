"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-green-300 to-green-400 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Product App</h1>
      <nav className="space-x-9">
        <Link
          href="/products"
          className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                     hover:after:w-full after:transition-all after:duration-300"
        >
          Products
        </Link>
        <Link
          href="/products/add"
          className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                     hover:after:w-full after:transition-all after:duration-300"
        >
          Add Product
        </Link>
        <Link
          href="/register"
          className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                     hover:after:w-full after:transition-all after:duration-300"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                     hover:after:w-full after:transition-all after:duration-300"
        >
          Login
        </Link>

        <Link
          href="/profile"
          className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                     hover:after:w-full after:transition-all after:duration-300"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
