const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a member by id
 * @name app.members.getById
 * @param {string} id - The id of the member.
 * @returns {Promise} Promise.
 * @example
 * await app.members.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const church = await db.Church.findOne({
    where: { id },
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url'],
      },
      {
        model: db.Payment,
        as: 'payments',
      },
      {
        model: db.Member,
        as: 'members',
      },
    ],
  });

  if (church === null) {
    throw new NotFoundError(`Church not found`);
  }

  return church;
}

module.exports = {
  getById,
};
