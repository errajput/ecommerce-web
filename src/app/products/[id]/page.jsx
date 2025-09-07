"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageSlider from "@/Components/ImageSlider";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        console.log("Product API response:", data);
        setProduct(data.data);
      })
      .catch((err) => {
        console.error(err);
        setProduct(null);
      });
  }, [id]);

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
          product: product._id,
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

  const goToCart = () => {
    router.push("/cart");
  };

  if (product === undefined) return <p className="text-center">Loading...</p>;
  if (product === null)
    return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
        {/*  Left: Image Slider */}
        <div className="flex justify-center items-start">
          <ImageSlider
            images={
              product.images?.length
                ? product.images.map((i) => `http://localhost:5000${i}`)
                : []
            }
          />
        </div>

        {/*  Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-2xl text-green-600 font-semibold mb-4">
            <strong>Price:</strong> ₹{product.price}
          </p>

          <p className="mb-2">
            <strong>Description:</strong>{" "}
            <span className="text-gray-700">{product.description}</span>
          </p>
          <p className="mb-2">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="mb-2">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {product.status}
          </p>
          <p className="mb-2">
            <strong>Stock:</strong> {product.stock}
          </p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
            >
              Add to Cart
            </button>
            <button
              onClick={goToCart}
              className=" mt-4 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition cursor-pointer"
            >
              Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
