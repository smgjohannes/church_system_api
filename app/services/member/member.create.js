const db = require('../../models');
const filterObj = require('../../utils/filterObj');
async function create(data, req, files) {
  console.log('Received files:', data);
  const insertValue = filterObj(data, [
    'id_number',
    'name',
    'surname',
    'cell_number',
    'date_of_birth',
    'age',
    'member_of',
    'local_church',
    'from_date',
    'father',
    'mother',
    'status',
  ]);

  let createdMember = await db.Member.create(insertValue);

  if (files) {
    await this.image.upload(req, 'Member', createdMember.id, files);
  }

  return createdMember;
}

module.exports = { create };
