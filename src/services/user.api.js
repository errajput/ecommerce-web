import { getApi, postApi } from "./http.service";

export const registerUser = (formData) => {
  return postApi("/auth/register", formData);
};

export const loginUser = (formData) => {
  return postApi("/auth/login", formData);
};

//  profile fetch
export const getUserProfile = async () => {
  const res = await getApi("/user/profile", true);

  if (!res?.data) throw new Error("Profile data missing");

  const { id, name, email, isSeller } = res.data;
  return { id, name, email, isSeller };
};
