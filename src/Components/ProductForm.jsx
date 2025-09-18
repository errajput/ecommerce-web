"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import SelectField from "@/ui/SelectField";
import NumberField from "@/ui/NumberField";
import TextField from "@/ui/TextField";

const PRODUCT_BRANDS = [
  "Apple",
  "Samsung",
  "Dell",
  "HP",
  "Google",
  "OnePlus",
  "Sony",
  "Lenovo",
  "Microsoft",
  "Huawei",
  "Xiaomi",
  "Amazon",
  "Vivo",
];
const PRODUCT_CATEGORY = ["Laptop", "Mobile", "Table"];

const PRODUCT_STATUS = ["Active", "Inactive", "Out of Stock"];

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [name, setName] = useState(initialData.name || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [brand, setBrand] = useState(initialData.brand || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [status, setStatus] = useState(initialData.status || "");
  const [stock, setStock] = useState(initialData.stock || "");
  const [images, setImages] = useState(initialData.images || []);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Save files
    setImages(files);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };
  const handleRemove = (index) => {
    // remove from both images and previews
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("stock", stock);

    images.forEach((file) => {
      formData.append("images", file);
    });

    await onSubmit(formData);
  };

  return (
    <div className="min-h-screen p-12 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-8">
          {initialData.name ? "Edit Product ✏️" : "Add New Product 🛒"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label={"Product Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <NumberField
              label={"Price"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter product description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label={"Brand"}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              options={PRODUCT_BRANDS}
            />
            <SelectField
              label={"Category"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={PRODUCT_CATEGORY}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label={"Status"}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={PRODUCT_STATUS}
            />

            <NumberField
              label={"Stock"}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          {initialData.images?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Previous Images
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {initialData.images.map((image) => (
                  <img
                    src={`http://localhost:5000${image}`}
                    key={image}
                    className="w-24 h-26 object-cover rounded-lg border shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input type="file" multiple onChange={handleFileChange} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              {previews.map((src, idx) => (
                <div key={idx} className="relative group">
                  <Image
                    src={src}
                    alt={`Preview ${idx}`}
                    width={300}
                    height={200}
                    className="w-full h-28 object-cover rounded-lg border shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="absolute top-0 right-0 text-black text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                  >
                    <X className="h-4 w-4 bg-black text-gray-300 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
