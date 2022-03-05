/**
 * Format a json data according to React Select options
 * @param {array of objects} jsonData
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
        id: item.product_id,
      });
    }
  });
  return formattedList;
};
