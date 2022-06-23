const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// Api for all the users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(response => res.json(response))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Api for user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'post_title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['post_title']
                }
            }
          ]

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

// Api for user's posts
router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
    })
    .then(response => {
      req.session.save(() => {
        req.session.user_id = response.id;
        req.session.username = response.username;
        req.session.loggedIn = true;
        res.json(response);
      });
    });
});

// Api for login
router.post('/login', (req, res) => {
    User.findOne({
      where: {
        email: req.body.username
      }
    }).then(response => {
      if (!response) {
        res.status(400).json({ message: 'No user found with this username' });
        return;
      }
  
      const correctPassword = response.checkPassword(req.body.password);
  
      if (!correctPassword) {
        res.status(400).json({ message: 'Incorrect password! Please try again.' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = response.id;
        req.session.username = response.username;
        req.session.loggedIn = true;
  
        res.json({ user: response, message: 'You are logged in!' });
      });
    });
});


//Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

module.exports = router;