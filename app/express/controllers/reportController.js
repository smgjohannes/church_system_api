const asyncMiddleware = require('../middleware/asyncMiddleware');
const reportService = require('../../services/report/report.get');

module.exports = function reportController(app) {
  /**
   * @api {post} /api/v1/index
   * @apiName get
   * @apiGroup report
   *
   */
  async function generate(req, res) {
    const data = await reportService.get(req.query);
    res.status(200).json(data);
  }

  return Object.freeze({
    generate: asyncMiddleware(generate),
  });
};
