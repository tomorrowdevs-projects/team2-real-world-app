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

/**
 * Validate the correct date format
 * @param {string} dateInput
 * @return {boolean}
 */
export const isValidDate = dateInput => {
  const dateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return dateFormat.test(dateInput);
};

/**
 * Validate the correct date range
 * @param {string} dateInput1
 * @param {string} dateInput2
 * @returns {boolean}
 */
export const isValidDateRange = (dateInput1, dateInput2) => {
  return (
    isValidDate(dateInput1) &&
    isValidDate(dateInput2) &&
    Date.parse(dateInput1) <= Date.parse(dateInput2)
  );
};
