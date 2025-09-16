// src/api/cartApi.js

const BASE_URL = "http://localhost:5000";
const CART_URL = `${BASE_URL}/cart/items`;

const getToken = () => localStorage.getItem("token");

export const fetchCart = async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login?message=Please login to view your cart";
    return;
  }

  if (!res.ok) throw new Error("Failed to fetch cart");

  return await res.json();
};

export async function addToCart(productId, token, quantity = 1) {
  try {
    const res = await fetch(CART_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product: productId, quantity }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to add to cart");
    return data;
  } catch (error) {
    console.error("addToCart error:", error);
    throw error;
  }
}

export const updateQuantity = async (itemId, quantity) => {
  const res = await fetch(`${BASE_URL}/cart/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
};

export const removeItem = async (itemId) => {
  const res = await fetch(`${BASE_URL}/cart/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
};

export const clearCart = async () => {
  const res = await fetch(`${BASE_URL}/cart/items`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
};
