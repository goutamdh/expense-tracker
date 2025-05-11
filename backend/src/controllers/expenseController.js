const expenseService = require('../services/expenseService');

exports.createExpense = async (req, res, next) => {
    try {
        const data = await expenseService.create(req.body, req.user.id);
        res.status(201).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

exports.getExpenses = async (req, res, next) => {
    try {
        const data = await expenseService.getAll(req.user.id);
        res.status(200).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

exports.updateExpense = async (req, res, next) => {
    try {
        const data = await expenseService.update(req.params.id, req.body, req.user.id);
        res.status(200).json({ success: true, data });
    } catch (err) {
        next(err);
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        await expenseService.remove(req.params.id, req.user.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};