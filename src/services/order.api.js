import { getApi, postApi } from "./http.service";

export const getOrders = () => {
  return getApi("/orders");
};

export const placeOrder = async () => {
  return postApi("/orders/place");
};
