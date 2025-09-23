"use client";

import ProductForm from "@/Components/ProductForm";
import { UserContext } from "@/providers";
import { getToken } from "@/services/http.service";
import { createProduct } from "@/services/product.api.js";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AddProductPage() {
  const router = useRouter();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user.isLogin) {
      router.push("/login");
      return;
    }

    if (!user.isSeller) {
      router.push("/");
      return;
    }
  }, [user, router]);

  const handleAddProduct = async (formData) => {
    try {
      const token = getToken();

      await createProduct(formData, token);

      router.push("/products");
    } catch (error) {
      console.error("AddProductPage error:", error);
      alert(error.message || "Error in Adding Product");
    }
  };
  if (!user.isLogin) return <p>Loading...</p>;
  if (!user.isSeller) return null;

  return (
    <>
      <ProductForm onSubmit={handleAddProduct} />
    </>
  );
}
