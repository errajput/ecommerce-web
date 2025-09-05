"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useDebounce from "@/Hooks/useDebounce";
import { getQuery } from "@/utils/functions";

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

        <button className="bg-gray-200 px-3 py-1 rounded" onClick={handleReset}>
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
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Image</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Brand</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Stocks</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} className="text-center">
                      <td className="border p-2">
                        {p.images?.length > 0 ? (
                          <img
                            src={`http://localhost:5000${p.images[0]}`}
                            alt={p.name}
                            className="w-16 h-16 object-cover mx-auto rounded"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td className="border p-2">
                        <Link href={`/products/${p._id}`}>{p.name}</Link>
                      </td>
                      <td className="border p-2">₹{p.price}</td>
                      <td className="border p-2 truncate max-w-[200px]">
                        {p.description}
                      </td>
                      <td className="border p-2">{p.brand}</td>
                      <td className="border p-2">{p.category}</td>
                      <td className="border p-2">{p.status}</td>
                      <td className="border p-2">{p.stock}</td>
                      <td className="border p-2 space-x-2">
                        <Link
                          href={`/products/${p._id}/edit`}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
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
                  className="border rounded-lg p-4 shadow-sm flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-10 ">
                    {p.images?.length > 0 ? (
                      <img
                        src={`http://localhost:5000${p.images[0]}`}
                        alt={p.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <span className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                        No Image
                      </span>
                    )}

                    <div>
                      <h3 className="font-bold">
                        <Link href={`/products/${p._id}`}>{p.name}</Link>
                      </h3>
                      <p className="text-gray-600">₹{p.price}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{p.description}</p>
                  <div className="text-sm grid grid-cols-2 gap-2">
                    <span>Brand: {p.brand}</span>
                    <span>Category: {p.category}</span>
                    <span>Status: {p.status}</span>
                    <span>Stock: {p.stock}</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Link
                      href={`/products/${p._id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
  );
}
