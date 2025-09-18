import { deleteApi, getApi, patchApi, postApi } from "./http.service";

export const fetchCart = () => {
  return getApi("/cart");
};

export const addToCart = (productId, quantity = 1) => {
  return postApi("/cart/items", { product: productId, quantity });
};

export const updateQuantity = (itemId, quantity) => {
  return patchApi(`/cart/items/${itemId}`, { itemId, quantity });
};

export const removeItem = async (itemId) => {
  return deleteApi(`/cart/items/${itemId}`, itemId);
};

export const clearCart = async () => {
  return deleteApi("/cart/items");
};
