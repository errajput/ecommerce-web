"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useDebounce from "@/Hooks/useDebounce";
import { getQuery } from "@/utils/functions";
import Header from "@/Components/Header";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("brand");
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 10;
  const debouncedQuery = useDebounce(search, 500);

  const getProducts = async (
    searchText,
    pageNo,
    sortBy,
    sortOrder,
    filterBy,
    filterValue
  ) => {
    try {
      const query = {
        search: searchText || "",
        sortBy,
        sortOrder,
        pageNo,
        pageSize,
      };
      const params = getQuery(query);

      if (filterBy && filterValue) {
        params.append("filterBy", filterBy);
        params.append("filterValue", filterValue);
      }

      const res = await fetch(
        `http://localhost:5000/products?${params.toString()}`
      );
      const data = await res.json();

      setProducts(data.products);
      setTotal(data.totalRecords);
    } catch (error) {
      console.log("Error Getting Products", error);
    }
  };

  //NOTE: Fetch products from backend API
  useEffect(() => {
    getProducts(
      debouncedQuery,
      pageNo,
      sortBy,
      sortOrder,
      filterBy,
      filterValue
    );
  }, [debouncedQuery, pageNo, sortBy, sortOrder, filterBy, filterValue]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setProducts(products.filter((p) => p._id !== id));
    setTotal((prev) => prev - 1);
  };

  const handleReset = () => {
    setSearch("");
    setFilterBy("brand");
    setFilterValue("");
    setSortBy("price");
    setSortOrder("asc");
    setPageNo(1);
  };

  const totalPage = Math.ceil(total / pageSize);
  return (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>

        {/* 🔍 Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label>Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All sorting</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="createdAt">CreatedAT</option>
            <option value="updatedAt">UpdatedAT</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <label>Filter:</label>
          <select
            value={filterBy === "brand" ? filterValue : ""}
            onChange={(e) => {
              setFilterBy("brand");
              setFilterValue(e.target.value);
              setPageNo(1); // reset to first page when filter changes
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Google">Google</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Sony">Sony</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Huawei">Huawei</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Amazon">Amazon</option>
            <option value="Vivo">Vivo</option>
          </select>
          <select
            value={filterBy === "category" ? filterValue : ""}
            onChange={(e) => {
              setFilterBy("category");
              setFilterValue(e.target.value);
              setPageNo(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">All Categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* <input
          type="text"
          className="border p-2 rounded"
          placeholder="Filter value..."
          value={filterValue}
          onChange={(e) => {
            setFilterValue(e.target.value);
            setPageNo(1);
          }}
        /> */}

          <button
            className="bg-gray-200 px-3 py-1 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <>
            <div className="h-96 overflow-y-scroll">
              {/* NOTE: Desktop / Tablet View (Table) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-green-600 text-white text-sm">
                      <th className="p-3 text-left">Image</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3">Brand</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Stocks</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, idx) => (
                      <tr
                        key={p._id}
                        className={`text-sm ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                      >
                        <td className="p-3">
                          {p.images?.length > 0 ? (
                            <img
                              src={`http://localhost:5000${p.images[0]}`}
                              alt={p.name}
                              className="w-16 h-16 object-contain rounded"
                            />
                          ) : (
                            <span className="text-gray-400">No Image</span>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-gray-900 truncate max-w-[200px]">
                          <Link href={`/products/${p._id}`}>{p.name}</Link>
                        </td>
                        <td className="p-3 text-green-600 font-bold">
                          ₹{p.price}
                        </td>
                        <td className="p-3 text-gray-600 truncate max-w-[250px]">
                          {p.description}
                        </td>
                        <td className="p-3 text-gray-700">{p.brand}</td>
                        <td className="p-3 text-gray-700">{p.category}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              p.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3">{p.stock}</td>
                        <td className="p-3 flex gap-2 justify-center">
                          <Link
                            href={`/products/${p._id}/edit`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 text-xs transition"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-xs transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ✅ Mobile View (Cards) */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((p) => (
                  <div
                    key={p._id}
                    className="border border-green-200 rounded-2xl p-4 shadow-md bg-white"
                  >
                    <div className="flex gap-4">
                      {p.images?.length > 0 ? (
                        <img
                          src={`http://localhost:5000${p.images[0]}`}
                          alt={p.name}
                          className="w-24 h-24 object-contain rounded"
                        />
                      ) : (
                        <span className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded text-gray-400">
                          No Image
                        </span>
                      )}
                      <div>
                        <h3 className="font-bold text-green-700">
                          <Link href={`/products/${p._id}`}>{p.name}</Link>
                        </h3>
                        <p className="text-green-600 font-semibold">
                          ₹{p.price}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${
                            p.status === "Available"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-2 text-gray-700">
                      <span>Brand: {p.brand}</span>
                      <span>Category: {p.category}</span>
                      <span>Stock: {p.stock}</span>
                    </div>
                    <div className="flex space-x-2 pt-3">
                      <Link
                        href={`/products/${p._id}/edit`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-all"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ✅ Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={pageNo === 1}
                onClick={() => setPageNo(pageNo - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {pageNo} of {totalPage || 1}
              </span>
              <button
                disabled={pageNo >= totalPage}
                onClick={() => setPageNo(pageNo + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            <p>
              Showing {products.length} of {total} Products
            </p>
          </>
        )}
      </div>
    </div>
  );
}
