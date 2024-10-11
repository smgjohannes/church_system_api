const fs = require('fs');
const db = require('../../models');
const { upload } = require('../image/actions/image.upload');
const { NotFoundError } = require('../../utils/coreErrors');

async function update(id, data, req) {
  const church = await db.Church.findByPk(id, {
    include: {
      model: db.Image,
      attributes: ['id', 'url', 'type', 'directory', 'name'],
    },
  });

  if (!church) {
    throw new NotFoundError('Church not found');
  }

  const updatedChurch = await church.update(data);

  if (req.files && req.files.length > 0) {
    // Delete existing images
    if (church.Images && church.Images.length > 0) {
      for (let img of church.Images) {
        // Construct the file path
        const filePath = `${__basedir}/uploads/${img.directory}/${img.name}`;

        // Delete the file from the file system
        if (fs.existsSync(filePath)) {
          fs.promises.unlink(filePath);
        }

        // Delete the image from the database
        await db.Image.destroy({ where: { id: img.id } });
      }
    }

    // Upload new images
    await upload(req, 'Church', church.id, req.files);
  }

  return updatedChurch.reload();
}

module.exports = {
  update,
};
