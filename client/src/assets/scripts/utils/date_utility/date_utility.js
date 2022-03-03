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
