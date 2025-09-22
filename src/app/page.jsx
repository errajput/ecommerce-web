"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { formatPrice } from "@/utils/format";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/services/http.service";
import { fetchProducts } from "@/services/product.api";
import { addToCart } from "@/services/cart.api";
import TextField from "@/ui/TextField";
import Button from "@/ui/Button";

const FeaturedProduct = ({ product, handleAddToCart }) => {
  const router = useRouter();
  return (
    <div
      key={product._id}
      className="border border-green-500 rounded-lg bg-white shadow-md hover:shadow-lg transition p-4 text-center"
    >
      <Link href={`/products/${product._id}`}>
        <img
          src={`${BASE_URL}${product.images[0]}`}
          alt={product.name}
          className="w-full h-60 object-contain  cursor-pointer
          border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg hover:border-emerald-500 hover:-translate-y-1 transition-all p-4 text-center"
        />

        <h3
          className="text-lg mt-2 truncate  cursor-pointer"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className=" text-emerald-600 font-bold">
          {formatPrice(product.price)}
        </p>
      </Link>

      {product.isInCart ? (
        <Button
          label={"Go to Cart"}
          onClick={() => router.push("/cart")}
          className="mt-3 !bg-gradient-to-r !from-blue-500 !to-purple-500 hover:shadow-xl"
        />
      ) : (
        <Button
          label={"Add to Cart"}
          onClick={() => handleAddToCart(product._id)}
          className="mt-3 !bg-gradient-to-r from-pink-300 !to-blue-500 hover:shadow-xl"
        />
      )}
    </div>
  );
};

export default function HomePage() {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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

      if (!result) throw Error("Please login to add product to cart.");

      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, isInCart: true } : p))
      );
      alert(" Product added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      {/* Heder Section */}
      <div className="p-12 text-center ">
        <h1 className="text-3xl font-bold my-2 text-green-600">
          Welcome to Product App 🚀
        </h1>
        <p className="text-black my-4">
          Discover amazing products at the best prices.
        </p>
        <div className="flex justify-center gap-2 my-2">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-4 h-9 !w-96  border-green-400"
          />
          <Button
            label={"Search"}
            // className="bg-green-500 text-white px-4 h-10 rounded-xl hover:bg-green-600"
          />
        </div>
      </div>

      {/* Top Categories */}
      <section className="container mx-auto px-6 py-7">
        <h2 className="text-2xl font-semibold mb-5 text-green-500">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center">
          {["Laptop", "Mobile", "Tablet"].map((category) => (
            <div
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-6 bg-white shadow rounded-lg hover:shadow-lg cursor-pointer transition ${
                selectedCategory === category ? "border-2 border-green-500" : ""
              }`}
            >
              <p className="font-medium">{category}</p>
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
              <FeaturedProduct
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
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
