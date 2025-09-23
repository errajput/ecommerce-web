"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageSlider from "@/Components/ImageSlider";
import { useRouter } from "next/navigation";

import { formatPrice, formatStock } from "@/utils/format";
import { getProductById } from "@/services/product.api";
import { addToCart } from "@/services/cart.api";
import { BASE_URL } from "@/services/http.service";
import Button from "@/ui/Button";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      }
    })();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      setProduct((prev) => ({ ...prev, isInCart: true }));
      alert("Product added to cart!");
    } catch (err) {
      alert(err.message);
    }
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
                ? product.images.map((i) => `${BASE_URL}${i}`)
                : []
            }
          />
        </div>

        {/*  Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <p className="text-2xl text-green-600 font-semibold mb-4">
            <strong>Price:</strong> {formatPrice(product.price)}
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
            <strong>Stock:</strong> {formatStock(product.stock)}
          </p>
          <div className="flex gap-4 mt-6">
            {product.isInCart ? (
              <Button
                label={"Go to Cart"}
                onClick={() => router.push("/cart")}
              />
            ) : (
              <Button label={"Add to Cart"} onClick={handleAddToCart} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
