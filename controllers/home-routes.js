const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../../utils/auth');

// Get all
router.get('/', (req, res) => {
    Post.findAll({
            attributes: [ 'id', 'post_title', 'post_content', 'created_at' ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(response => {
            const posts = response.map(post => post.get({ plain: true }));
            res.render('mainPage', 
            { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get by ID
router.get('/post/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id','post_title', 'post_content','created_at'],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(response => {
            if (!response) {
                res.status(404).json({
                    message: 'No posst found!!!'
                });
                return;
            }

            const posts = response.get({ plain: true });
           // Render a single post 
           res.render('onePost', {
             posts,
            loggedIn: req.session.loggedIn
           });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// SignUp route
router.get('/signUp', (req, res) => {
    res.render('signUp');
});


// A single post
router.get('/posts/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_content',
                'post_title',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: [
                    'id',
                    'comment_content',
                    'post_id',
                    'user_id',
                    'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(response => {
            if (!response) {
                res.status(404).json({ message: 'Unable to find a user with this id' });
                return;
            }
            const posts = response.get({ plain: true });
            res.render('onePost', 
            { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;