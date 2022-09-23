import { Request, Response } from 'express';
import { userModel } from '../model/User';
require('dotenv').config();

const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.json({ status: 'ok', msg: 'User created successfully' });
  } catch (error: any) {
    res.json({
      msg: 'This email is already in use by another account',
      error,
    });
  }
}

export async function validateUser(req: Request, res: Response) {
  const user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      SECRET,
    );
    return res.json({ status: 'ok', token });
  } else {
    return res.json({ status: 'Invalid Email/Password', user: false });
  }
}

export async function logUser(req: Request, res: Response) {
  const user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: 'ok', user });
  } else {
    return res.json({ status: 'Fail to Login', user: false });
  }
}
