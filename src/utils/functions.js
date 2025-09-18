/**
 * To get something TODO: It’s a helper to sanitize query(Cleaner URLs,Backend safety,undefine,null and empty string) objects before converting them into URLSearchParams(the query string only contains valid, non-empty parameters).
 */
export const getQuery = (query) => {
  const checkedQuery = {};
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      checkedQuery[key] = value;
    }
  }
  return new URLSearchParams(checkedQuery);
};
