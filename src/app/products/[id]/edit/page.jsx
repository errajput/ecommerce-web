"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleUpdate = async (formData) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "PATCH",
      body: formData,
    });

    router.push("/products");
  };

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <>
      <h2 className="text-2xl font-bold text-center my-4">Edit Product</h2>
      <ProductForm initialData={product} onSubmit={handleUpdate} />
    </>
  );
}
