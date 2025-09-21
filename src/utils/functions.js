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

/**
 * Combines multiple class names into a single string
 * Ignores falsy values (false, null, undefined, '')
 *
 * @param  {...(string|undefined|false|null)} classes
 * @returns {string}
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
