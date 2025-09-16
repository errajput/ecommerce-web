import { getQuery } from "@/utils/functions";

const API_URL = "http://localhost:5000";

const PRODUCT_URL = `${API_URL}/products`;

//  Fetch products with search, filter, sort, pagination
export async function fetchProducts({
  searchText = "",
  pageNo = 1,
  pageSize = 10,
  sortBy = "",
  sortOrder = "",
  filterBy = "",
  filterValue = "",
}) {
  try {
    const query = {
      search: searchText,
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

    const res = await fetch(`${PRODUCT_URL}?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch products");

    return await res.json();
  } catch (error) {
    console.error("fetchProducts error:", error);
    throw error;
  }
}

//  Delete product
export async function deleteProduct(id, token) {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete product");

    return await res.json();
  } catch (error) {
    console.error("deleteProduct error:", error);
    throw error;
  }
}

//  Create product
export async function createProduct(formData, token) {
  try {
    const res = await fetch(PRODUCT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // formData because you’re uploading images
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create product");
    }

    return await res.json();
  } catch (error) {
    console.error("createProduct error:", error);
    throw error;
  }
}

// Get single product
export async function getProductById(id) {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return await res.json();
  } catch (error) {
    console.error("getProductById error:", error);
    throw error;
  }
}

//  Update product
export async function updateProduct(id, formData) {
  const res = await fetch(`${PRODUCT_URL}/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}
