const { create } = require('./payment.create');
const { get } = require('./payment.get');
const { getById } = require('./payment.getById');
const { update } = require('./payment.update');
const { destroy } = require('./payment.destroy');
const { stats } = require('./payment.stats');
const { getAccountDetails } = require('./payment.accountdetails');

class Payment {
  constructor() {}
}

Payment.prototype.get = get;
Payment.prototype.getById = getById;
Payment.prototype.create = create;
Payment.prototype.update = update;
Payment.prototype.destroy = destroy;
Payment.prototype.stats = stats;
Payment.prototype.getAccountDetails = getAccountDetails;

module.exports = Payment;
