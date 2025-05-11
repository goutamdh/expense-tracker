const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const Joi = require('joi');

const validateRegister = (data) => Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
}).validate(data);

const validateLogin = (data) => Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).validate(data);

exports.register = async ({ name, email, password }) => {
    const { error } = validateRegister({ name, email, password });
    if (error) throw new Error(error.details[0].message);

    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    return { id: user.id, name, email };
};

exports.login = async ({ email, password }) => {
    const { error } = validateLogin({ email, password });
    if (error) throw new Error(error.details[0].message);

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};