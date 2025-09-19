import { getQuery } from "@/utils/functions";
import { deleteApi, getApi, patchApi, postApi } from "./http.service";

//  Fetch products with search, filter, sort, pagination
export const fetchProducts = ({
  searchText = "",
  pageNo = 1,
  pageSize = 10,
  sortBy = "",
  sortOrder = "",
  filterBy = "",
  filterValue = "",
}) => {
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

  return getApi(`/products?${params.toString()}`);
};

//  Delete product
export const deleteProduct = (id) => {
  return deleteApi(`/products/${id}`);
};

//  Create product
export const createProduct = (formData) => {
  return postApi("/products", formData, true);
};

// Get single product
export const getProductById = (id) => {
  return getApi(`/products/${id}`);
};

//  Update product
export const updateProduct = (id, formData) => {
  return patchApi(`/products/${id}`, formData, true);
};
