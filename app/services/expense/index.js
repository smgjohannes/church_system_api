const { create } = require('./expense.create');
const { get } = require('./expense.get');
const { getById } = require('./expense.getById');
const { update } = require('./expense.update');
const { destroy } = require('./expense.destroy');

class Expense {
  // constructor(image) {
  //   this.image = image;
  // }
}

Expense.prototype.get = get;
Expense.prototype.getById = getById;
Expense.prototype.create = create;
Expense.prototype.update = update;
Expense.prototype.destroy = destroy;

module.exports = Expense;
