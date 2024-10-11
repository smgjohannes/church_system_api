const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function destroy(id, res) {
  const expense = await db.Expense.findOne({
    where: { id },
    // include: {
    //   model: db.Image,
    //   attributes: ['id', 'url', 'type'],
    // },
  });

  if (!expense) {
    throw new NotFoundError('Expense not found');
  }

  // if (member.Images && member.Images.length > 0) {
  //   for (let img of member.Images) {
  //     await this.image.destroy(img.id);
  //   }
  // }

  await expense.destroy();

  return { done: true };
}

module.exports = {
  destroy,
};
