const db = require('../../models');
const filterObj = require('../../utils/filterObj');

async function create(data) {
  const insertValue = filterObj(data, [
    'amount',
    'transaction_reference',
    'description',
    'payment_date',
    'payment_id',
    'created_at',
    'updated_at',
  ]);

  console.log('Insert Value:', insertValue); // Debugging step

  // Start a transaction
  const transaction = await db.sequelize.transaction();

  try {
    // Check if the account exists and has enough balance
    if (data.account) {
      const account = await db.Payment.findOne({
        where: { account: data.account },
        transaction,
      });

      if (!account) {
        throw new Error('Account not found');
      }

      if (account.amount < data.amount) {
        throw new Error(
          `Insufficient balance. Account has $${account.amount}, but you tried to subtract $${data.amount}.`
        );
      }

      // Subtract the amount from the account balance
      await db.Payment.update(
        { amount: db.sequelize.literal(`amount - ${data.amount}`) },
        { where: { account: data.account }, transaction }
      );

      // Set the payment_id for the expense
      insertValue.payment_id = account.id;
    } else {
      throw new Error('Account is required.');
    }

    // Create the expense entry
    const createdExpense = await db.Expense.create(insertValue, {
      transaction,
    });

    // Commit the transaction
    await transaction.commit();

    return createdExpense;
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    throw error;
  }
}

module.exports = { create };
