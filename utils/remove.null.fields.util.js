const removeNullUndefinedFields = (obj) => {
  // Handle non-object types or null directly
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Recursively process each key in the object
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      acc[key] =
        typeof value === "object" ? removeNullUndefinedFields(value) : value;
    }
    return acc;
  }, {});
};

module.exports = removeNullUndefinedFields