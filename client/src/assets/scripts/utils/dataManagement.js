import { isValidDate } from './date_utility/date_utility';

/**
 * User data management after authentication
 * Goal: not to create errors in case of corrupted data
 * If the photo is not required, the third parameter is optional
 * @param {Object} user
 * @param {string} data
 * @param {string} defaultData
 * @returns {string}
 */

export const getUserData = (user, data, defaultPhoto) => {
  return user && typeof user == 'object' && user[data]
    ? user[data]
    : data !== 'photo'
    ? ''
    : defaultPhoto;
};

/**
 * Response query data management
 * Goal: not to create errors in case of corrupted data
 * @param {any} prop
 * @param {string} type
 * @param {string} text
 * @param {string} date
 * @returns {any}
 */
export const getResponseData = (prop, type, text, date = null) => {
  if (date === 'date') {
    return prop && typeof prop === type && isValidDate(prop) ? prop : text;
  } else {
    return prop && typeof prop === type ? prop : text;
  }
};
