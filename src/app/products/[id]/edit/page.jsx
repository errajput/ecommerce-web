"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/Components/ProductForm";
import { getProductById, updateProduct } from "@/services/product.api";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateProduct(id, formData);
      router.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <>
      {/* <h2 className="text-2xl font-bold text-center my-4">Edit Product</h2> */}
      <ProductForm initialData={product} onSubmit={handleUpdate} />
    </>
  );
}
