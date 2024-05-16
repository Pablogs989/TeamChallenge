const User = require("../models/User.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { JWT_SECRET } = process.env
const transporter = require("../config/nodemailer");

const UserController = {
    async register(req, res, next) {
        try {
            const user = await User.create({ ...req.body });
            res.status(201).send({ message: "User registered", user });
        } catch (error) {
            next(error)
        }
    },

    async login(req, res, next) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
            if (!user) {
                return res.status(400).send("Invalid email or password")
            }
            if (!req.body.password || req.body.password !== user.password) {
                return res.status(400).send("Invalid email or password")
            }
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.status(200).send({ message: 'Welcome ' + user.email, token });
        } catch (error) {
            next(error)
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            });
            res.send({ message: "Logged out" });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem logging out the user",
            });
        }
    },
};

module.exports = UserController;