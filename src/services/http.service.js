export const BASE_URL = "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");
export const isUserLogin = () => !!getToken();
export const logoutUser = () => removeToken();

// GET
export const getApi = async (path, isAuth = true) => {
  const token = getToken();
  if (!token && isAuth) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (res.status === 403 || res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  if (!res.ok) throw new Error("Failed to fetch cart");

  return await res.json();
};

// POST
export const postApi = async (path, body) => {
  const token = getToken();
  // if (!token) {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  //   return;
  // }
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (res.status === 403 || res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error("postApi   error:", error);
    throw error;
  }
};

// PATCH
export const patchApi = async (path, body, isFormData = false) => {
  const token = getToken();
  if (!token) {
    localStorage.removeItem("token");
    window.location.href = "/login";
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
      localStorage.removeItem("token");
      window.location.href = "/login";
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
    localStorage.removeItem("token");
    window.location.href = "/login";
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
      localStorage.removeItem("token");
      window.location.href = "/login";
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
