const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(response => res.json(response))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


//Go in a specific comment
router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(response => res.json(response))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// if logged in
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_content: req.body.comment_content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(response => res.json(response))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

//Delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
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