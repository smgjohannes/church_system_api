const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @description Update a user.
 * @param {string} id - The user id to update.
 * @param {object} formData - The new user.
 * @returns {Promise} Return the updated user.
 * @example
 * raceresult.user.update('184515e8-27c0-45c3-97f5-f5e7d14aecce', {
 *    name: 'Logan'
 * });
 */
async function update(id, formData) {
  const user = await db.User.findByPk(id);

  if (user === null) {
    throw new NotFoundError(`User not found`);
  }

  return await user.update(formData);
}

module.exports = {
  update,
};
