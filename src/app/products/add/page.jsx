"use client";

import ProductForm from "@/Components/ProductForm";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const handleAddProduct = async (formData) => {
    await fetch("http://localhost:5000/products", {
      method: "POST",
      body: formData,
    });
    router.push("/products");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center my-4">Add Product</h2>
      <ProductForm onSubmit={handleAddProduct} />
    </>
  );
}
