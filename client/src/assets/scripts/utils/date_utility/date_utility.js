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

/**
 * Validate that the date format is correct and that the date range is invalid
 * @param {string} dateInput1
 * @param {string} dateInput2
 * @returns {boolean}
 */
export const isInvalidDateRangeProp = (dateInput1, dateInput2) => {
  if (!isValidDate(dateInput1) || !isValidDate(dateInput2)) {
    return false;
  } else if (isValidDateRange(dateInput1, dateInput2)) {
    return false;
  } else {
    return true;
  }
};

/**
 * Convert date from ISO YYY-MM-DD in DD/MM/YYYY
 * The validity of the parameter must have already been checked
 * If the format of the parameter is YYYY-MM-DD returns DD/MM/YYYY
 * otherwise returns the parameter
 * @param {string} dateInput
 * @returns {string}
 */
export const convertDateDMY = dateInput => {
  if (isValidDate(dateInput)) {
    return `${dateInput.split('-')[2]}/${dateInput.split('-')[1]}/${
      dateInput.split('-')[0]
    }`;
  } else {
    return dateInput;
  }
};
