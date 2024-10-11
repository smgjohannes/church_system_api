const { create } = require('./church.create');
const { get } = require('./church.get');
const { getById } = require('./church.getById');
const { update } = require('./church.update');
const { destroy } = require('./church.destroy');

class Church {
  constructor(image) {
    this.image = image;
  }
}

Church.prototype.get = get;
Church.prototype.getById = getById;
Church.prototype.create = create;
Church.prototype.update = update;
Church.prototype.destroy = destroy;

module.exports = Church;
