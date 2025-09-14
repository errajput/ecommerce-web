// src/utils/format.js

export function formatPrice(value, currency = "INR") {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatStock(stock) {
  if (stock === 0) return "Out of Stock ❌";
  if (stock < 5) return `Only ${stock} left ⚠️`;
  return `${stock} in stock ✅`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
