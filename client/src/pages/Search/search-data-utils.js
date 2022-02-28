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

/**
 * Format a json data according to React Select options
 * @param {array of objects} list
 * @returns array
 */
export const formatList = jsonData => {
  const formattedList = [];
  jsonData.forEach(item => {
    if (
      item.product_id &&
      item.product_name &&
      typeof item.product_id === 'number' &&
      typeof item.product_name === 'string' &&
      item.product_name !== ''
    ) {
      formattedList.push({
        value: item.product_name,
        label: item.product_name,
        id: item.product_id
      });
    }
  });
  return formattedList;
};
