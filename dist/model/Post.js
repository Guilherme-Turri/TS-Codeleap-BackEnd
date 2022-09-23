"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    //author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});
exports.postModel = (0, mongoose_1.model)('Post', postSchema);
