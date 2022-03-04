/**
 * Validate that the input data is a valid json format
 * @param {array} data
 * @returns boolean
 */
export const isValidJson = data => {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      item => Object.keys(item).length !== 0 && item.constructor === Object
    )
  );
};
