const db = require('../../models');
const filterObj = require('../../utils/filterObj');

async function create(payload) {
  try {
    const requiredFields = ['account', 'date', 'amount', 'reference'];
    requiredFields.forEach((field) => {
      if (!payload[field]) {
        throw new Error(`${field} is required in the payload`);
      }
    });

    const insertValue = filterObj(payload, requiredFields);

    requiredFields.forEach((field) => {
      if (!insertValue[field]) {
        throw new Error(`${field} is missing in the filtered payload`);
      }
    });

    // Create the payment in the database
    let createdPayment = await db.Payment.create(insertValue);

    const { memberId } = payload;

    if (memberId) {
      await db.MemberPayment.create({
        member_id: memberId,
        payment_id: createdPayment.id,
      });
    }

    return createdPayment;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

module.exports = { create };
