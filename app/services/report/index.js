const { get } = require('./report.get');

class Report {
  constructor() {}
}

Report.prototype.get = get;

module.exports = Report;
