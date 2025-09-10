"use client";

import ProductForm from "@/Components/ProductForm";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const handleAddProduct = async (formData) => {
    console.log('localStorage.getItem("token")', localStorage.getItem("token"));

    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (res.ok) {
      router.push("/products");
    } else {
      alert("Error in Adding Product");
    }
  };

  return (
    <>
      {/* <h2 className="text-2xl font-bold text-center my-4">Add Product</h2> */}
      <ProductForm onSubmit={handleAddProduct} />
    </>
  );
}
