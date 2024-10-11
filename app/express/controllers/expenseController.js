const asyncMiddleware = require('../middleware/asyncMiddleware');
const expenseService = require('../../services/expense/expense.update');

module.exports = function expenseController(app) {
  async function get(req, res) {
    const response = await app.expenses.get(req.query);
    res.json(response);
  }

  async function create(req, res) {
    try {
      const createdExpense = await app.expenses.create(req.body);
      return res.status(201).json(createdExpense);
    } catch (error) {
      console.error('Error creating expense:', error);
      return res
        .status(500)
        .json({ status: 500, code: 'SERVER_ERROR', message: error.message });
    }
  }
  async function update(req, res) {
    const updatedExpense = await expenseService.update(
      req.params.id,
      req.body,
      req
    );
    res.status(200).json(updatedExpense);
  }

  async function getById(req, res) {
    const response = await app.expenses.getById(req.params.id);
    res.json(response);
  }

  async function destroy(req, res) {
    const { id } = req.params;
    const deletedExpense = await app.expenses.destroy(id, res);
    res.status(200).json({ expense: deletedExpense });
  }

  return Object.freeze({
    get: asyncMiddleware(get),
    create: asyncMiddleware(create),
    update: asyncMiddleware(update),
    getById: asyncMiddleware(getById),
    destroy: asyncMiddleware(destroy),
  });
};
