"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { formatPrice } from "@/utils/format";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/services/http.service";
import { fetchProducts } from "@/services/product.api";
import { addToCart } from "@/services/cart.api";

export default function HomePage() {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts({
          searchText: search || "",
          filterBy: selectedCategory ? "category" : "",
          filterValue: selectedCategory || "",
        });
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [search, selectedCategory]);

  const handleAddToCart = async (productId) => {
    try {
      const result = await addToCart(productId, 1);

      if (!result.ok)
        throw new Error(result.message || "Failed to add to cart");

      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, isInCart: true } : p))
      );
      alert(" Product added to cart!");
    } catch (err) {
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
        <div className="flex justify-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border border-green-400 bg-white rounded-l px-4 py-2 w-64"
          />
          <button className="bg-green-500 text-white px-4 rounded-xl hover:bg-green-600">
            Search
          </button>
        </div>
      </div>

      {/* Top Categories */}
      <section className="container mx-auto px-6 py-7">
        <h2 className="text-2xl font-semibold mb-5 text-green-500">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
          {["Laptop", "Mobile", "Tablet"].map((astro) => (
            <div
              key={astro}
              onClick={() => setSelectedCategory(astro)}
              className={`p-6 bg-white shadow rounded-lg hover:shadow-lg cursor-pointer transition ${
                selectedCategory === astro ? "border-2 border-green-500" : ""
              }`}
            >
              <p className="font-medium">{astro}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-500">
          {selectedCategory
            ? `Top ${selectedCategory} Products`
            : "Featured Products"}
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
                    src={`${BASE_URL}${product.images[0]}`}
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
      </section>

      {/* Platform Features */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold text-center text-green-500 mb-6">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 shadow rounded-lg">
            <h3 className="font-bold text-lg mb-2">🚚 Fast Delivery</h3>
            <p>Get your products delivered quickly and safely.</p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <h3 className="font-bold text-lg mb-2">💳 Secure Payment</h3>
            <p>Pay confidently with our secure payment system.</p>
          </div>
          <div className="p-6 shadow rounded-lg">
            <h3 className="font-bold text-lg mb-2">✨ Trusted Quality</h3>
            <p>We offer only the best, verified products.</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-green-50 py-12 px-6">
        <h2 className="text-2xl font-semibold text-center text-green-500 mb-6">
          Customer Reviews
        </h2>
        <div className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2">
          <div className="p-6 bg-white shadow rounded-lg">
            <p>"Amazing quality and super fast delivery!"</p>
            <p className="text-sm text-gray-600 mt-2">- Disha R.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <p>"Best shopping experience I've ever had."</p>
            <p className="text-sm text-gray-600 mt-2">- Sachin K. R.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-green-500 mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto">
          We are a passionate team bringing you the best online shopping
          experience. Our mission is to make quality products accessible at
          affordable prices.
        </p>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold text-green-500 mb-4">
          Contact Us
        </h2>
        <p>Email: support@AstroCart.com</p>
        <p>Phone: +91 </p>
      </section>
    </div>
  );
}
