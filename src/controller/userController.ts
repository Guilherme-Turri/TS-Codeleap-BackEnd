require('dotenv').config();
import { Request, Response } from 'express';
import { userModel } from '../model/User';
import { postModel } from '../model/Post';


const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      SECRET,
    );
    
    return res.json({ user,  status: 'ok', msg: 'User created successfully', token });
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
      'huahuauhauhahu',
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

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId); 
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    return res.status(200).json({ status: 'ok', user }); 
  } catch (error: any) {
        return res.status(500).json({ status: 'error', message: error.message });
  }
}
 export async function updateUserAvatarPic(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const avatarPic = req.body.avatarPic;
    const user = await userModel.findByIdAndUpdate(userId, { avatarPic }, { new: true });
    const result = await postModel.updateMany({ authorId: userId }, { avatarPic: avatarPic })
    if (!user || !result) {
       return res.status(404).json({ status: 'error', message: 'User/Post not found' });
    }
    return res.status(200).json({ status: 'ok', message: 'Avatar picture updated successfully' ,user}); 
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
} 
