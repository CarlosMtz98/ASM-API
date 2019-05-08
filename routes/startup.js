const startupController = require('../controllers/startup');
const isAuth = require('../middleware/is_auth');
const { body } = require('express-validator/check');
const express = require('express');
const router = express.Router();

// GET
router.get('/posts', isAuth, startupController.getPosts);

// POST
router.post('/post', isAuth,
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 })
    ], 
    startupController.createPost
);

// READ
router.get('/post/:postId', isAuth, startupController.getPost);

// UPDATE
router.put('/post/:postId', isAuth,
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 })
    ], 
    startupController.updatePost
);

// DELETE
router.delete('/post/:postId', isAuth, startupController.deletePost);

module.exports = router;