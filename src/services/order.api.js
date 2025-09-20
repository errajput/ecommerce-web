import { getApi, patchApi, postApi } from "./http.service";

export const getOrders = () => {
  return getApi("/orders");
};

export const placeOrder = () => {
  return postApi("/orders/place");
};

export const updateOrderStatus = (id, status) => {
  return patchApi(`/orders/${id}/status`, { status });
};
