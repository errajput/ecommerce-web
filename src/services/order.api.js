const API_URL = "http://localhost:5000";

const ORDER_URL = `${API_URL}/orders`;

export async function getOrders() {
  const res = await fetch(ORDER_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export const placeOrder = async () => {
  const res = await fetch(`${ORDER_URL}/place`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data;
};
