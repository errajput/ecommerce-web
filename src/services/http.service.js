export const BASE_URL = "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");
export const isUserLogin = () => !!getToken();
export const logoutUser = () => removeToken();

function handleUnauthorized() {
  removeToken();
  window.location.href = "/login";
}
// GET
export const getApi = async (path, isAuth = true) => {
  const token = getToken();
  if (!token && isAuth) {
    handleUnauthorized();
    return;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (res.status === 403 || res.status === 401) {
    handleUnauthorized();
    return;
  }

  if (!res.ok) throw new Error("Failed to fetch cart");

  return await res.json();
};

// POST
export const postApi = async (
  path,
  body,
  isFormData = false,
  isAuth = true
) => {
  const token = getToken();
  if (!token && isAuth) {
    handleUnauthorized();
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && !isFormData && { body: JSON.stringify(body) }),
      ...(body && isFormData && { body }),
    });

    if (res.status === 403 || res.status === 401) {
      handleUnauthorized();
      return;
    }
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    if (
      !error.message.includes("Invalid credentials") &&
      !error.message.includes("Email")
    ) {
      console.error("postApi error:", error);
    }
    throw error;
  }
};

// PATCH
export const patchApi = async (path, body, isFormData = false) => {
  const token = getToken();
  if (!token) {
    handleUnauthorized();
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && !isFormData && { body: JSON.stringify(body) }),
      ...(body && isFormData && { body }),
    });

    if (res.status === 403 || res.status === 401) {
      handleUnauthorized();
      return;
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error("update error:", error.message);
    throw error;
  }
};

// DELETE
export const deleteApi = async (path) => {
  const token = getToken();
  if (!token) {
    handleUnauthorized();
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (res.status === 403 || res.status === 401) {
      handleUnauthorized();
      return;
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    console.error("delete error:", error.message);
    throw error;
  }
};
