"use client";

import ProductForm from "@/Components/ProductForm";
import { getToken } from "@/services/http.service";
import { createProduct } from "@/services/product.api.js";
import { getUserProfile } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    async function checkSeller() {
      try {
        const token = getToken();
        if (!token) {
          router.push("/login");
          return;
        }

        const user = await getUserProfile(token);
        if (!user?.isSeller) {
          router.push("/");
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
      const token = getToken;

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
      <ProductForm onSubmit={handleAddProduct} />
    </>
  );
}
