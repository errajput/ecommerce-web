"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Header from "@/Components/Header";

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
    <div>
      <Header />
      <div className="min-h-screen p-12 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-extrabold text-center text-green-700 mb-8">
            {initialData.name ? "Edit Product ✏️" : "Add New Product 🛒"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">Select Brand</option>
                  <option>Apple</option>
                  <option>Samsung</option>
                  <option>Dell</option>
                  <option>HP</option>
                  <option>Google</option>
                  <option>OnePlus</option>
                  <option>Sony</option>
                  <option>Lenovo</option>
                  <option>Microsoft</option>
                  <option>Huawei</option>
                  <option>Xiaomi</option>
                  <option>Amazon</option>
                  <option>Vivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option>Laptop</option>
                  <option>Mobile</option>
                  <option>Tablet</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
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
                      <XMarkIcon className="h-4 w-4 bg-black text-gray-300 cursor-pointer" />
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
    </div>
  );
}
