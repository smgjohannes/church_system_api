const fs = require('fs');
const db = require('../../models');
const { upload } = require('../image/actions/image.upload');
const { NotFoundError } = require('../../utils/coreErrors');

async function update(id, data, req) {
  const expense = await db.Expense.findByPk(id, {
    // include: {
    //   model: db.Image,
    //   attributes: ['id', 'url', 'type', 'directory', 'name'],
    // },
  });

  if (!expense) {
    throw new NotFoundError('Expense not found');
  }

  const updatedExpense = await expense.update(data);

  // if (req.files && req.files.length > 0) {
  //   // Delete existing images
  //   if (expense.Images && expense.Images.length > 0) {
  //     for (let img of expense.Images) {
  //       // Construct the file path
  //       const filePath = `${__basedir}/uploads/${img.directory}/${img.name}`;

  //       // Delete the file from the file system
  //       if (fs.existsSync(filePath)) {
  //         fs.promises.unlink(filePath);
  //       }

  //       // Delete the image from the database
  //       await db.Image.destroy({ where: { id: img.id } });
  //     }
  //   }

  //   // Upload new images
  //   await upload(req, 'Member', expense.id, req.files);
  // }

  return updatedExpense.reload();
}

module.exports = {
  update,
};
