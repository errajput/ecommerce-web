"use client";

import ProductForm from "@/Components/ProductForm";
import { createProduct } from "@/services/product.api.js";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const handleAddProduct = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      await createProduct(formData, token);

      router.push("/products");
    } catch (error) {
      console.error("AddProductPage error:", error);
      alert(error.message || "Error in Adding Product");
    }
  };

  return (
    <>
      {/* <h2 className="text-2xl font-bold text-center my-4">Add Product</h2> */}
      <ProductForm onSubmit={handleAddProduct} />
    </>
  );
}
