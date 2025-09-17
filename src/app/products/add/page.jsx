"use client";

import ProductForm from "@/Components/ProductForm";
import { createProduct } from "@/services/product.api.js";
import { getUserProfile } from "@/services/user.api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    async function checkSeller() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const user = await getUserProfile(token);
        if (!user?.isSeller) {
          router.push("/"); // or show "Not Authorized"
          return;
        }

        setIsSeller(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkSeller();
  }, [router]);

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

  if (loading) return <p>Loading...</p>;
  if (!isSeller) return null;
  return (
    <>
      {/* <h2 className="text-2xl font-bold text-center my-4">Add Product</h2> */}
      <ProductForm onSubmit={handleAddProduct} />
    </>
  );
}
