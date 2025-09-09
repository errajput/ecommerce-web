"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4"
    >
      <div>
        <label className="block font-medium">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Brand</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Tablet">Tablet</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Status</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
          <option value="out_of_stock">out_of_stock</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      {initialData.images?.length > 0 && (
        <div>
          Previous Images
          {initialData.images?.length > 0 ? (
            initialData.images.map((image) => {
              return (
                <img
                  src={`http://localhost:5000${image}`}
                  // alt
                  key={image}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              );
            })
          ) : (
            <span>No Image</span>
          )}
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Upload Images</label>
        <input type="file" multiple onChange={handleFileChange} />
        <div>
          {previews.map((src, idx) => (
            <div key={idx} className="relative group inline-block mr-2 mt-2">
              <Image
                src={src}
                alt={`Preview ${idx}`}
                width={300}
                height={200}
                className="w-24 h-24 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-0 right-0 text-black text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
              >
                <XMarkIcon className="h-6 w-6 bg-black text-gray-300 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500"
      >
        Save Product
      </button>
    </form>
  );
}
