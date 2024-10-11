const { Op } = require('sequelize');
const db = require('../../models');

async function getAccountDetails(account, year) {
  const currentYear = year || new Date().getFullYear();

  // Fetch the payments for the given account and year, including the associated members
  const payments = await db.Payment.findAll({
    where: {
      account: account,
      created_at: {
        [Op.gte]: new Date(currentYear, 0, 1),
        [Op.lt]: new Date(currentYear + 1, 0, 1),
      },
    },
    attributes: ['id', 'amount', 'date'],
    include: [
      {
        model: db.Member,
        as: 'member',
        attributes: ['id', 'name', 'surname'],
        through: { attributes: [] },
        required: false, // This makes the association optional, so payments with no members are included
      },
    ],
  });

  // Format the payment details for the frontend
  const accountDetails = payments.map((payment) => ({
    id: payment.id,
    amount: parseFloat(payment.amount),
    date: payment.date,
    member: payment.member?.length
      ? payment.member.map((member) => ({
          name: `${member.name} ${member.surname}`,
        }))
      : null, // Return null if no members
  }));

  return accountDetails;
}

module.exports = { getAccountDetails };
