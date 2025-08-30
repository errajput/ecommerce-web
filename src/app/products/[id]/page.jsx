"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageSlider from "@/Components/ImageSlider";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          {/* ✅ Left: Image Slider */}
          <div className="flex justify-center items-start">
            <ImageSlider
              images={[
                ...product.images.map((i) => `http://localhost:5000${i}`),
              ]}
            />
          </div>

          {/* ✅ Right: Product Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

            <p className="text-2xl text-green-600 font-semibold mb-4">
              <strong>Price:</strong> ₹{product.price}
            </p>

            <p className="mb-2">
              <strong>Description:</strong>
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
              <strong>Stock:</strong> ₹{product.stock}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
