const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../models');

const DEFAULT_OPTIONS = {
  fields: [
    'id',
    'amount',
    'transaction_reference',
    'payment_date',
    'description',
    'created_at',
    'updated_at',
  ],
  skip: 0,
  order_dir: 'ASC',
  order_by: 'id',
};

async function get(options) {
  const optionsWithDefault = Object.assign({}, DEFAULT_OPTIONS, options);

  const queryParams = {
    attributes: optionsWithDefault.fields,
    offset: optionsWithDefault.skip,
    order: [[optionsWithDefault.order_by, optionsWithDefault.order_dir]],
    include: [
      {
        model: db.Payment, // Include the Payment model
        as: 'payment', // Alias used in your model association
        attributes: ['account'], // Only select the 'account' field from Payment
      },
    ],
    where: {},
  };

  // Limit results if 'take' is provided
  if (optionsWithDefault.take) {
    queryParams.limit = optionsWithDefault.take;
  }

  // Apply search functionality
  if (optionsWithDefault.search) {
    queryParams.where = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('amount')), {
          [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
        }),
        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('transaction_reference')),
          {
            [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
          }
        ),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('payment_date')), {
          [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
        }),
        Sequelize.where(Sequelize.fn('lower', Sequelize.col('description')), {
          [Op.like]: `%${optionsWithDefault.search.toLowerCase()}%`,
        }),
      ],
    };
  }

  // Apply account filter from the frontend if provided
  if (optionsWithDefault.account) {
    queryParams.where['$payment.account$'] = {
      [Op.eq]: optionsWithDefault.account,
    };
  }

  // Apply date filter if 'startDate' and 'endDate' are provided
  if (optionsWithDefault.startDate && optionsWithDefault.endDate) {
    queryParams.where.payment_date = {
      [Op.between]: [optionsWithDefault.startDate, optionsWithDefault.endDate],
    };
  } else if (optionsWithDefault.startDate) {
    queryParams.where.payment_date = {
      [Op.gte]: optionsWithDefault.startDate,
    };
  } else if (optionsWithDefault.endDate) {
    queryParams.where.payment_date = {
      [Op.lte]: optionsWithDefault.endDate,
    };
  }

  const expenses = await db.Expense.findAll(queryParams);
  return expenses;
}

module.exports = {
  get,
};
