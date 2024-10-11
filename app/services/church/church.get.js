const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'name',
    'address',
    'contact_number',
    'created_at',
    'updated_at',
  ],
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
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
    include: [
      {
        model: db.Image,
        attributes: ['id', 'name', 'url'],
      },
      {
        model: db.Payment,
        as: 'payments',
      },
    ],
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
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('address')), {
          [Op.like]: `%${optionsWithDefault.search}%`,
        }),

        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('contact_number')),
          {
            [Op.like]: `%${optionsWithDefault.search}%`,
          }
        ),
      ],
    };
  }

  const churches = await db.Church.findAll(queryParams);

  const churchesPlain = churches.map((church) => {
    // we converted the member to plain object
    const churchPlain = church.get({ plain: true });
    return churchPlain;
  });

  return churchesPlain;
}

module.exports = {
  get,
};
