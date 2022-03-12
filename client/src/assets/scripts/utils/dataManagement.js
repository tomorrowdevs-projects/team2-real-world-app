import { isValidDate } from './date_utility/date_utility';

/**
 * User data management after authentication
 * Goal: not to create errors in case of corrupted data
 * If the photo is not required, the third parameter is optional
 * @param {Object} user user data
 * @param {string} prop Properties of the customized object to use
 * @param {string} defaultPhoto path of default image if the data is not available
 * @returns {string}
 */
export const getUserData = (user, prop, defaultPhoto) => {
  return user && typeof user == 'object' && user[prop]
    ? user[prop]
    : prop !== 'photo'
    ? ''
    : defaultPhoto;
};

/**
 * Response query data management
 * Goal: not to create errors in case of corrupted data
 * @param {array of object} list response received
 * @param {string} prop property of the response to use
 * @param {string} type Typing of the expected data
 * @param {string} text text to be returned if the data is not available
 * @param {string} option At the moment it concerns dates or values followed by a comma and two numbers
 * @returns {any} It depends on the input value
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
    return (list[0][prop] || list[0][prop] === 0) &&
      typeof list[0][prop] === type
      ? list[0][prop].toFixed(2)
      : text;
  } else {
    return list[0][prop] && typeof list[0][prop] === type
      ? list[0][prop]
      : text;
  }
};
