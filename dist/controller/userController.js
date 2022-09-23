"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUser = exports.validateUser = exports.createUser = void 0;
const User_1 = require("../model/User");
require('dotenv').config();
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.userModel.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            return res.json({ status: 'ok', msg: 'User created successfully' });
        }
        catch (error) {
            res.json({
                msg: 'This email is already in use by another account',
                error,
            });
        }
    });
}
exports.createUser = createUser;
function validateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.userModel.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (user) {
            const token = jwt.sign({
                name: user.name,
                email: user.email,
            }, SECRET);
            return res.json({ status: 'ok', token });
        }
        else {
            return res.json({ status: 'Invalid Email/Password', user: false });
        }
    });
}
exports.validateUser = validateUser;
function logUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.userModel.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (user) {
            return res.json({ status: 'ok', user });
        }
        else {
            return res.json({ status: 'Fail to Login', user: false });
        }
    });
}
exports.logUser = logUser;
