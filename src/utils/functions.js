export const getQuery = (query) => {
  const checkedQuery = {};
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      checkedQuery[key] = value;
    }
  }
  return new URLSearchParams(checkedQuery);
};
