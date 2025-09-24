import { getApi, patchApi, postApi } from "./http.service";

export const getOrders = () => {
  return getApi("/orders");
};

export const placeOrder = (address) => {
  return postApi("/orders/place", address);
};

export const updateOrderStatus = (id, status) => {
  return patchApi(`/orders/${id}/status`, { status });
};
