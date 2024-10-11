const db = require('../../models');
const { NotFoundError } = require('../../utils/coreErrors');

async function destroy(id, res) {
  const church = await db.Church.findOne({
    where: { id },
    include: {
      model: db.Image,
      attributes: ['id', 'url', 'type'],
    },
  });

  if (!church) {
    throw new NotFoundError('Church not found');
  }

  if (church.Images && church.Images.length > 0) {
    for (let img of church.Images) {
      await this.image.destroy(img.id);
    }
  }

  await church.destroy();

  return { done: true };
}

module.exports = {
  destroy,
};
