"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./controller/userController");
const postController_1 = require("./controller/postController");
const verifyJWT_1 = require("./controller/verifyJWT");
const router = (0, express_1.Router)();
exports.default = router
    .get('/', (req, res) => {
    res.status(200).send('API IS WORKING - TURRI');
})
    .post('/api/register', userController_1.createUser)
    .post('/api/login', userController_1.validateUser)
    .post('/api/auth', verifyJWT_1.verifyJWT, userController_1.logUser)
    .get('/api/user/:id', userController_1.getUserById)
    .post('/api/posts', verifyJWT_1.verifyJWT, postController_1.createPost)
    .get('/api/posts', postController_1.getAllPosts)
    .delete('/api/posts/:id', verifyJWT_1.verifyJWT, postController_1.deletePost)
    .patch('/api/posts/:id', verifyJWT_1.verifyJWT, postController_1.updatePost)
    .patch('/api/user/:id', verifyJWT_1.verifyJWT, userController_1.updateUserAvatarPic);
