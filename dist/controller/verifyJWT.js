"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jwt = require('jsonwebtoken');
require('dotenv').config();
function verifyJWT(req, res, next) {
    const SECRET = process.env.SECRET;
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Bad Auth token' }).end();
        }
        next();
        //return res.json({ token: 'ok' });
    });
}
exports.verifyJWT = verifyJWT;
