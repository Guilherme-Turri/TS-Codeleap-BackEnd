import { Router, Request, Response } from 'express';
import { createUser, validateUser, logUser } from './controller/userController';
import {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
} from './controller/postController';
import { verifyJWT } from './controller/verifyJWT';

const router = Router();
export default router
  .get('/', (req: Request, res: Response) => {
    res.status(200).send('API IS WORKING - TURRI');
  })
  .post('/api/register', createUser)
  .post('/api/login', validateUser)
  .post('/api/auth', verifyJWT, logUser)
  .post('/api/posts', verifyJWT, createPost)
  .get('/api/posts', getAllPosts)
  .delete('/api/posts/:id', verifyJWT, deletePost)
  .patch('/api/posts/:id', verifyJWT, updatePost);
