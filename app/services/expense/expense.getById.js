const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

/**
 * @private
 * @description This function return a expense by id
 * @name app.expenses.getById
 * @param {string} id - The id of the expense.
 * @returns {Promise} Promise.
 * @example
 * await app.expenses.getById('6b9bc8b7-b98d-4dda-b0fd-88fc10bd0b00');
 *
 */
async function getById(id) {
  const expense = await db.Expense.findOne({
    where: { id },
    // include: {
    //   model: db.Image,
    //   attributes: ['id', 'name', 'url'],
    // },
  });

  if (expense === null) {
    throw new NotFoundError(`Expense not found`);
  }

  return expense;
}

module.exports = {
  getById,
};
