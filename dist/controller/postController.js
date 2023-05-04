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
exports.updatePost = exports.deletePost = exports.getAllPosts = exports.createPost = void 0;
const Post_1 = require("../model/Post");
const app_1 = require("../app");
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield Post_1.postModel.create({
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                authorId: req.body.authorId,
                avatarPic: req.body.avatarPic,
            });
            app_1.io.emit('new-post', post.authorId);
            //const allPosts = await postModel.find();
            //return res.json({ status: 'ok', allPosts });
            return res.json({ status: 'ok', msg: 'Post Created!' });
        }
        catch (error) {
            //return res.json({ status: 'error', error: error.message });
            return res.json({ status: 'error', error: error.message });
        }
    });
}
exports.createPost = createPost;
function getAllPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield Post_1.postModel.find();
            return res.status(200).json(post);
        }
        catch (error) {
            console.log(`Something is wrong! ${error.message}`);
            return res.status(500).json({ status: 'error', error: error.message });
        }
    });
}
exports.getAllPosts = getAllPosts;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const post = yield Post_1.postModel.findById(id);
            if (!post) {
                return res.status(404).json({ msg: 'Pots not found/dont exist', error: 'ok' });
            }
            yield post.delete();
            const allPosts = yield Post_1.postModel.find();
            return res
                .status(200)
                .json({ msg: 'Post has been deleted successfully', allPosts });
        }
        catch (error) {
            console.log(`Something is wrong ${error.message}`);
            return res.status(400).json({ msg: 'Fail to delete! Try again later', error: 'ok' });
        }
    });
}
exports.deletePost = deletePost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const data = req.body;
            const post = yield Post_1.postModel.findById(id);
            if (!post) {
                return res.status(404).json({ msg: 'Pots not found/dont exist' });
            }
            yield Post_1.postModel.updateOne({ _id: id }, data);
            const allPosts = yield Post_1.postModel.find();
            return res.status(200).json({ msg: 'Update successfully', allPosts });
        }
        catch (error) {
            return res.status(404).json({ error: 'Fail to delete! Try again later' });
        }
    });
}
exports.updatePost = updatePost;
