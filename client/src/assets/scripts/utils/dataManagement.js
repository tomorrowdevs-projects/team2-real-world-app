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
