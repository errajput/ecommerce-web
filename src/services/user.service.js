import { getApi, getToken, postApi, removeToken } from "./http.service";

export const registerUser = (formData) => {
  return postApi("/auth/register", formData);
};

export const logoutUser = () => removeToken();

export const loginUser = (formData) => postApi("/auth/login", formData);

export const isUserLogin = () => !!getToken();

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
