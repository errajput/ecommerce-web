"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { formatPrice } from "@/utils/format";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
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

  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          product: productId,
          quantity: 1,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to add to cart");
      // console.log("Cart API result:", result);
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, isInCart: true } : p))
      );
      alert(" Product added to cart!");
      // console.log("Cart response:", result);
    } catch (err) {
      console.error(" Cart error:", err);
      alert(err.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100">
      <div className="p-6 text-center ">
        <h1 className="text-3xl font-bold mb-2 text-green-600">
          Welcome to Product App 🚀
        </h1>
        <p className="text-black mb-4">
          Discover amazing products at the best prices.
        </p>
      </div>

      <main className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-500">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-green-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-green-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-green-500 rounded-lg bg-white shadow-md hover:shadow-lg transition p-4 text-center"
              >
                <Link href={`/products/${product._id}`}>
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-60 object-contain rounded cursor-pointer"
                  />

                  <h3
                    className="text-lg mt-2 truncate  cursor-pointer"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <p className="text-green-600 font-bold">
                    {formatPrice(product.price)}
                  </p>
                </Link>

                {product.isInCart ? (
                  <button
                    onClick={() => router.push("/cart")}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="mt-3 bg-green-200 text-green-500 px-4 py-2 rounded hover:bg-green-600 hover:text-white cursor-pointer"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
