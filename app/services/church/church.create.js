const db = require('../../models');
const filterObj = require('../../utils/filterObj');
async function create(data, req, files) {
  const insertValue = filterObj(data, ['name', 'address', 'contact_number']);

  let createdChurch = await db.Church.create(insertValue);

  if (files) {
    await this.image.upload(req, 'Church', createdChurch.id, files);
  }

  return createdChurch;
}

module.exports = { create };
