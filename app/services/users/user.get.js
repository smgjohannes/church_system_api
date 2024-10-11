const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: ['id', 'name', 'email'],
  expand: [],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

/**
 * @description Get list of users
 * @param {Object} options - Options of the query.
 * @returns {Promise} Return list of users.
 * @example
 * const users = await raceresult.user.get({
 *  take: 20,
 *  skip: 0
 * });
 */
async function get(options) {
  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const queryParams = {
    attributes: optionsWithDefault.fields,
    include: includeExpand,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
  };

  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  if (optionsWithDefault.search) {
    queryParams.where = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),
      ],
    };
  }

  const users = await db.User.findAll(queryParams);

  const usersPlain = users.map((user) => {
    // we converted the user to plain object
    const userPlain = user.get({ plain: true });
    return userPlain;
  });

  return usersPlain;
}

module.exports = {
  get,
};
