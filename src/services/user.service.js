import { getApi, postApi } from "./http.service";

export const registerUser = (formData) => postApi("/auth/register", formData);

export const loginUser = (formData) => postApi("/auth/login", formData);

/**
 * To Get user information
 * @returns {{ id: string; name: string; email: string; isSeller: boolean;}}
 */

export const getUserProfile = async () => {
  const res = await getApi("/user/profile");

  if (!res?.data) throw new Error("Profile data missing");

  const { id, name, email, isSeller } = res.data;
  return { id, name, email, isSeller };
};
