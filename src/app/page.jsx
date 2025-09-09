"use client";
import { useEffect, useState } from "react";
import Header from "@/Components/Header";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Add to Cart
  // const handleAddToCart = async (productId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       localStorage.setItem(
  //         "redirectMessage",
  //         " Please login to add items to cart"
  //       );
  //       router.push("/login"); // redirect to login if no token
  //       return;
  //     }
  //     const res = await fetch("http://localhost:5000/cart/items", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
  //       },
  //       body: JSON.stringify({ productId, quantity: 1 }),
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       setMessage(" Product added to cart!");
  //     } else {
  //       setMessage(` Failed: ${data.message || "Something went wrong"}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Error adding product to cart");
  //   }

  //   // Hide message after 3 seconds
  //   setTimeout(() => setMessage(""), 3000);
  // };
  const handleAddToCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authentication:
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          product: products._id,
          quantity: 1,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to add to cart");

      alert(" Product added to cart!");
      console.log("Cart response:", result);
    } catch (err) {
      console.error(" Cart error:", err);
      alert(err.message);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <div className="p-6 text-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-2">Welcome to Product App 🚀</h1>
        <p className="text-gray-600 mb-4">
          Discover amazing products at the best prices.
        </p>
        <nav className="space-x-4">
          {/* <Link
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
          </Link> */}
        </nav>
      </div>

      {/* Products Section */}
      <main className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-md hover:shadow-lg transition p-4 text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-gray-600 text-white text-center p-4 mt-10">
        © 2025 Product App. All rights reserved.
      </footer>
    </div>
  );
}
