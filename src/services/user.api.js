// src/api/userApi.js

const BASE_URL = "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

export const registerUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`, // optional for register, can be removed
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");

  return data;
};

export const loginUser = async (formData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");

  return data;
};

//  profile fetch
export const getUserProfile = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`${BASE_URL}/user/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

  return data;
};
