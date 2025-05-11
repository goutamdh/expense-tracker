const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        console.log("Request body:", req.body);
        const user = await authService.register(req.body);
        console.log("User created:", user);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({ success: true, token });
    } catch (err) {
        next(err);
    }
};