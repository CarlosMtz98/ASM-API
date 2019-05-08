const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        requires: true
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, 

    { timestamps: true }

);

const Post = mongoose.model('Post', postSchema);


exports.Post = Post;