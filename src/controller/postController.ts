import { Request, Response } from 'express';
import { postModel } from '../model/Post';

export async function createPost(req: Request, res: Response) {
  try {
    const post = await postModel.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      authorId: req.body.authorId,
    });
    const allPosts = await postModel.find();
    return res.json({ status: 'ok', allPosts });
  } catch (error: any) {
    return res.json({ status: 'error', error: error.message });
  }
}
export async function getAllPosts(req: Request, res: Response) {
  try {
    const post = await postModel.find();
    return res.status(200).json(post);
  } catch (error: any) {
    console.log(`Something is wrong ${error.message}`);
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ msg: 'Pots not found/dont exist' });
    }
    await post.delete();
    const allPosts = await postModel.find();
    return res
      .status(200)
      .json({ msg: 'Post has been deleted successfully', allPosts });
  } catch (error: any) {
    console.log(`Something is wrong ${error.message}`);
    return res.status(400).json({ msg: 'Fail to delete! Try again later' });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ msg: 'Pots not found/dont exist' });
    }

    await postModel.updateOne({ _id: id }, data);
    const allPosts = await postModel.find();

    return res.status(200).json({ msg: 'Update successfully', allPosts });
  } catch (error: any) {
    return res.status(404).json({ msg: 'Fail to delete! Try again later' });
  }
}
