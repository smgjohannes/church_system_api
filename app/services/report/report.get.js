const { Op } = require('sequelize');
const db = require('../../models');
const moment = require('moment');

async function get(options) {
  let { type } = options;

  const initialDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);

  //default date is now
  let fromDate = new Date();
  // default 30 days behind
  let toDate = new Date(initialDate);

  const where = {
    date: {
      [Op.gte]: moment(new Date()).format('YYYY-MM-DD'),
      [Op.lte]: moment(new Date(initialDate)).format('YYYY-MM-DD'),
    },
    attributes: [
      [db.sequelize.fn('max', db.sequelize.col('amount')), 'total'],
      'date',
    ],
    raw: true,
    order: db.sequelize.literal('total DESC'),
  };

  if (options.fromDate || options.toDate) {
    fromDate = options.fromDate ? new Date(options.fromDate) : new Date();
    toDate = options.toDate ? new Date(options.toDate) : new Date(initialDate);
    where.date = {
      [Op.gte]: moment(new Date(fromDate)).format('YYYY-MM-DD'),
      [Op.lte]: moment(new Date(toDate)).format('YYYY-MM-DD'),
    };
  }

  let reports;
  switch (type) {
    case 'expenses':
      reports = await db.Expense.findAll(where);
      break;
    case 'payments':
      reports = await db.Payment.findAll(where);
      break;
    case 'members':
      reports = await db.Member.findAll({
        include: {
          model: db.Payment,
          as: 'payments',
          through: where,
        },
      });
      break;
    default:
      reports = await db.Expense.findAll(where);
  }
  console.log(reports);
  return reports;
}

module.exports = {
  get,
};
