const { Expense } = require('../models');

exports.create = async (data, userId) => {
    return await Expense.create({ ...data, userId });
};

exports.getAll = async (userId) => {
    return await Expense.findAll({ where: { userId } });
};

exports.update = async (id, data, userId) => {
    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) throw new Error('Not found');
    return await expense.update(data);
};

exports.remove = async (id, userId) => {
    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) throw new Error('Not found');
    return await expense.destroy();
};