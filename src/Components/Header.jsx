"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-br from-green-300 to-green-400 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Product App</h1>
      <nav className="hidden md:flex space-x-9">
        <Link
          href="/products"
          className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                     hover:after:w-full after:transition-all after:duration-300"
        >
          Products
        </Link>

        {isLoggedIn && (
          <Link
            href="/products/add"
            className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                       after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                       hover:after:w-full after:transition-all after:duration-300"
          >
            Add Product
          </Link>
        )}

        {!isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            {/* <Link
              href="/cart"
              className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                         after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                         hover:after:w-full after:transition-all after:duration-300"
            >
              Cart
            </Link>
            <Link
              href="/orders"
              className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                         after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                         hover:after:w-full after:transition-all after:duration-300"
            >
              Orders
            </Link> */}
            <Link
              href="/profile"
              className="cursor-pointer relative transition duration-300 hover:text-green-700 font-bold
                         after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1
                         hover:after:w-full after:transition-all after:duration-300"
            >
              Profile
            </Link>
            {/* <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600 font-bold"
            >
              Logout
            </button> */}
          </>
        )}
      </nav>
      <button
        className="md:hidden text-2xl focus:outline-none cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-50  bg-green-200 text-green-700 flex flex-col items-center space-y-4 py-4 shadow-md md:hidden">
          <Link
            href="/products"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          {isLoggedIn && (
            <Link
              href="/products/add"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Add Product
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link
                href="/register"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                href="/login"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {/* <Link
                href="/cart"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Cart
              </Link>
              <Link
                href="/orders"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Orders
              </Link> */}
              <Link
                href="/profile"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-gray-200 text-black  px-3 py-1 rounded hover:bg-gray-300 font-bold cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

/* Tailwind helper styles */
const navLinkClasses =
  "cursor-pointer relative transition duration-300 hover:text-green-700 font-bold after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300";
