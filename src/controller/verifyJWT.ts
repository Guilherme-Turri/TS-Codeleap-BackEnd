import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export function verifyJWT(req: Request, res: Response, next: any) {
  const SECRET = process.env.SECRET;
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err: Error, decoded: any) => {
    if (err) {
     return res.status(401).json({ error: 'Bad Auth token' }).end();
    }
    next();
    //return res.json({ token: 'ok' });
  });
}
