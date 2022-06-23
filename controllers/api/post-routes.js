const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all
router.get('/', (req, res) => {
    Post.findAll({
    attributes: ['id', 'post_title', 'post_content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_content',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: { model: User, attributes: ['username'] },
        },
      ],
    })
      .then(response => res.json(response))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//get by ID
router.get('/:id', (req, res) => {
    Post.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'post_title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User, attributes: ['username']
          }
        }
      ]
    })
      .then(response => {
        if (!response) {
          res.status(404).json({ message: 'No user in the database with this id.'});
          return;
        }
        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.post('/', withAuth, (req, res) => {
    Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.session.user_id
    })
      .then(response => res.json(response))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


//Update 
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.post_title,
        post_content: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(response => {
        if (!response) {
          res.status(404).json({ message: 'No user in the database with this id.'});
          return;
        }
        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//delete
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(response => {
        if (!response) {
          res.status(404).json({ message: 'No user in the database with this id.' });
          return;
        }
        res.json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;