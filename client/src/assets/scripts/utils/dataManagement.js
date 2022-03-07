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
export const getResponseData = (list, prop, type, text, option = null) => {
  if (!list) {
    return '';
  } else if (option === 'date') {
    return list[0][prop] &&
      typeof list[0][prop] === type &&
      isValidDate(list[0][prop])
      ? list[0][prop]
      : text;
  } else if (option === 'float(2)') {
    return list[0][prop] && typeof list[0][prop] === type
      ? parseFloat(list[0][prop].toFixed(2))
      : text;
  } else {
    return list[0][prop] && typeof list[0][prop] === type
      ? list[0][prop]
      : text;
  }
};
